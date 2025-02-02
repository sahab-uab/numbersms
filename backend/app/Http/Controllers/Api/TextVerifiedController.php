<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Cache;

class TextVerifiedController extends Controller
{
    private $baseUrl;
    private $apiKey;
    private $email;

    public function __construct()
    {
        $this->baseUrl = env('TEXTVERIFIED_BASEURL');
        $this->apiKey = env('TEXTVERIFIED_APIKEY');
        $this->email = env('TEXTVERIFIED_EMAIL');
    }

    public function generateBearerToken()
    {
        $token = Cache::get('bearer_token');

        if ($token) {
            return response()->json(['token' => $token]);
        }

        $response = Http::withHeaders([
            'X-API-KEY' => $this->apiKey,
            'X-API-USERNAME' => $this->email
        ])->post("{$this->baseUrl}/api/pub/v2/auth");

        if ($response->failed()) {
            return response()->json(['error' => 'Failed to authenticate'], 500);
        }

        $data = $response->json();
        Cache::put('bearer_token', $data['token'], now()->addMinutes(60));

        return response()->json(['token' => $data['token']]);
    }

    public function getAccountDetails()
    {
        $token = Cache::get('bearer_token');
        if (!$token) {
            return response()->json(['error' => 'Unauthorized'], 401);
        }

        $response = Http::withToken($token)->get("{$this->baseUrl}/api/pub/v2/account/me");

        return $response->json();
    }

    public function getServiceList()
    {
        $token = Cache::get('bearer_token');
        if (!$token) {
            return response()->json(['error' => 'Unauthorized'], 401);
        }

        $params = [
            'numberType' => 'mobile',
            'reservationType' => 'verification'
        ];

        $response = Http::withToken($token)->get("{$this->baseUrl}/api/pub/v2/services", $params);

        return $response->json();
    }

    public function createVerification()
    {
        $token = Cache::get('bearer_token');
        if (!$token) {
            return response()->json(['error' => 'Unauthorized'], 401);
        }

        $data = [
            'serviceName' => 'airbnb',
            'capability' => 'sms'
        ];

        $response = Http::withToken($token)->post("{$this->baseUrl}/api/pub/v2/verifications", $data);

        return $response->json();
    }

    public function getVerificationDetails($href)
    {
        $token = Cache::get('bearer_token');
        if (!$token) {
            return response()->json(['error' => 'Unauthorized'], 401);
        }

        $response = Http::withToken($token)->get($href);

        return $response->json();
    }
}
