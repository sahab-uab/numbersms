<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Transaction;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Stripe\Stripe;
use Stripe\Checkout\Session as StripeSession;
use Stripe\Checkout\Session;
use Srmklive\PayPal\Services\PayPal as PayPalClient;

class PaymentController extends Controller
{
    // ✅ Generate Payment Link (Stripe / PayPal)
    public function createPayment(Request $request)
    {
        $request->validate([
            'amount' => 'required|numeric|min:1',
            'gateway' => 'required|string|in:stripe,paypal',
        ]);

        $amount = $request->amount;
        $currency = strtoupper('usd');
        $gateway = strtolower($request->gateway);
        $successUrl = route('pay_success');
        $failedUrl = route('pay_faild');

        if ($gateway === 'stripe') {
            return $this->createStripePayment($amount, $currency, $successUrl, $failedUrl);
        } elseif ($gateway === 'paypal') {
            return $this->createPayPalPayment($amount, $currency, $successUrl, $failedUrl);
        }

        return response()->json(['status' => 'error', 'message' => 'Invalid payment gateway'], 400);
    }

    // ✅ Stripe Payment Link
    private function createStripePayment($amount, $currency, $successUrl, $failedUrl)
    {
        try {
            Stripe::setApiKey(env('STRIPE_SECRET'));

            $session = Session::create([
                'payment_method_types' => ['card'],
                'line_items' => [
                    [
                        'price_data' => [
                            'currency' => $currency,
                            'product_data' => ['name' => 'Payment'],
                            'unit_amount' => $amount * 100, // Convert to cents
                        ],
                        'quantity' => 1,
                    ]
                ],
                'mode' => 'payment',
                'success_url' => $successUrl . '?session_id={CHECKOUT_SESSION_ID}',
                'cancel_url' => $failedUrl,
            ]);

            return response()->json([
                'status' => 'success',
                'gateway' => 'stripe',
                'payment_link' => $session->url,
            ]);
        } catch (\Exception $e) {
            return response()->json(['status' => 'error', 'message' => $e->getMessage()], 400);
        }
    }

    // ✅ PayPal Payment Link
    private function createPayPalPayment($amount, $currency, $successUrl, $failedUrl)
    {
        try {
            $provider = new PayPalClient;
            $provider->setApiCredentials(config('paypal'));
            $provider->getAccessToken();

            $order = $provider->createOrder([
                "intent" => "CAPTURE",
                "purchase_units" => [
                    [
                        "amount" => [
                            "currency_code" => $currency,
                            "value" => $amount,
                        ]
                    ]
                ],
                "application_context" => [
                    "return_url" => $successUrl,
                    "cancel_url" => $failedUrl,
                ]
            ]);

            return response()->json([
                'status' => 'success',
                'gateway' => 'paypal',
                'payment_link' => $order['links'][1]['href'],
            ]);
        } catch (\Exception $e) {
            return response()->json(['status' => 'error', 'message' => $e->getMessage()], 400);
        }
    }

    // ✅ Payment Success
    public function success(Request $request)
    {
        $gateway = $request->query('gateway');

        if ($gateway === 'stripe') {
            $sessionId = $request->query('session_id');
            Stripe::setApiKey(env('STRIPE_SECRET'));
            $session = StripeSession::retrieve($sessionId);

            // Save payment to database
            $this->savePayment($session->id, $session->amount_total / 100, 'stripe', $session->payment_status, $session->customer_email);
            
        } elseif ($gateway === 'paypal') {
            $provider = new PayPalClient;
            $provider->setApiCredentials(config('paypal'));
            $provider->getAccessToken();

            $paymentId = $request->query('token');
            $order = $provider->capturePaymentOrder($paymentId);

            // Save payment to database
            $this->savePayment($paymentId, $order['purchase_units'][0]['payments']['captures'][0]['amount']['value'], 'paypal', 'completed', $order['payer']['email_address']);
        }

        return response()->json(['status' => false, 'message' => 'Invalid gateway']);
    }

    // ❌ Payment Failed
    public function faild(Request $request)
    {
        return response()->json(['status' => false, 'message' => 'Payment failed or was cancelled.']);
    }

    // 📌 Save Payment to Database
    private function savePayment($paymentId, $amount, $gateway, $status, $email)
    {
        $currentUser = Auth::user();
        Transaction::create([
            'user_id' => $currentUser->id,
            'username' => $currentUser->name,
            'getway' => $gateway,
            'amount' => $amount,
            'status' => $status
        ]);

        return response()->json([
            'status' => true,
            'message' => $amount . ' Amount added success and now your current balance is ' . $currentUser->coin,
            'amount' => $amount,
            'totalamount' => $currentUser->coin,
            'getway' => $gateway,
            'data' => []
        ]);
    }
}
