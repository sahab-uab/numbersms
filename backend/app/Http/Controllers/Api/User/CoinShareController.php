<?php

namespace App\Http\Controllers\Api\User;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Transaction;
use App\Models\User;

class CoinShareController extends Controller
{
     public function shareToken(Request $request)
    {
        $request->validate([
            'email' => 'required|email',
            'amount' => 'required'
        ]);

        $user = User::where('email', $request->email)->first();

        // check user has or not
        if (!$user) {
            return response()->json([
                'status' => false,
                'message' => 'No user found by this email',
                'data' => []
            ]);
        }

        // check balance
        $currentUser = auth()->user();

        $amount = floatval($request->amount);
        if ($currentUser->coin < $amount) {
            return response()->json([
                'status' => false,
                'message' => 'Low balance',
                'data' => []
            ]);
        }

        // share coin
        $currentUser->coin = $currentUser->coin - $amount;
        $currentUser->save();
        // for current user
        Transaction::create([
            'user_id' => $currentUser->id,
            'username' => $currentUser->name,
            'getway' => 'Share',
            'amount' => $amount,
            'status' => true
        ]);

        $user->coin = $user->coin + $amount;
        $user->save();
        // for shared user
        Transaction::create([
            'user_id' => $user->id,
            'username' => $user->name,
            'getway' => 'Share',
            'amount' => $amount,
            'status' => true
        ]);

        return response()->json([
            'status' => true,
            'message' => $request->amount . ' Amount shared success and now your current balance is ' . auth()->user()->coin,
            'data' => []
        ]);
    }
}
