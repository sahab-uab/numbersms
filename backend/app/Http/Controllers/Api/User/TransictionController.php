<?php

namespace App\Http\Controllers\Api\User;

use App\Http\Controllers\Controller;
use App\Models\Transaction;
use Illuminate\Http\Request;

class TransictionController extends Controller
{
    public function index()
    {
        $data = Transaction::where('user_id', auth()->user()->id)->get();

        if (!$data) {
            return response()->json([
                'status' => true,
                'message' => 'No transaction data found!',
                'data' => []
            ]);
        }

        return response()->json([
            'status' => true,
            'message' => 'all transaction data',
            'data' => $data
        ]);
    }
}
