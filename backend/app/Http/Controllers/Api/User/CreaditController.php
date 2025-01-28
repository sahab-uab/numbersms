<?php

namespace App\Http\Controllers\Api\User;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Transaction;

class CreaditController extends Controller
{
    public function index(Request $request)
    {
        $request->validate([
            'amount' => 'required',
            'getway' => 'required',
            'status' => 'required'
        ]);

        try {
            $amount = floatval($request->amount);
            
            $currentUser = auth()->user();
            $currentUser->coin = $currentUser->coin + $amount;
            $currentUser->save();
            // for current user
            Transaction::create([
                'user_id' => $currentUser->id,
                'username' => $currentUser->name,
                'getway' => $request->getway,
                'amount' => $amount,
                'status' => $request->status == true ? 1 : 0
            ]);
            return response()->json([
                'status' => true,
                'message' => $request->amount . ' Amount added success and now your current balance is ' . $currentUser->coin,
                'amount' => $amount,
                'totalamount' => $currentUser->coin,
                'getway' => $request->getway,
                'data' => []
            ]);
        } catch (\Exception $th) {
            return response()->json([
                'status' => false,
                'message' => $th,
                'data' => []
            ]);
        }
    }
}
