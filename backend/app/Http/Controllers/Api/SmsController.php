<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Services;
use App\Models\SmsHistory;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;

class SmsController extends Controller
{
    // get services list
    public function getServices()
    {
        try {
            $data = Services::where('price', '!=', 0)->where('selling_price', '!=', 0)->get();
            if ($data) {
                return response()->json([
                    'status' => true,
                    'message' => 'All of services list',
                    'data' => $data
                ]);
            } else {
                return response()->json([
                    'status' => false,
                    'message' => 'No data foudn!',
                    'data' => []
                ]);
            }
        } catch (\Exception $th) {
            return response()->json([
                'status' => false,
                'message' => $th->getMessage(),
                'data' => []
            ]);
        }
    }

    // create verification
    public function createVerify(Request $request)
    {
        try {
            $request->validate([
                'id' => 'required',
            ]);

            $servicesData = Services::find($request->id);

            // data has or not
            if (!$servicesData) {
                return response()->json([
                    'status' => false,
                    'message' => "Invalid services",
                    'data' => []
                ]);
            }

            // check balance
            $currentUser = auth()->user();
            if ($servicesData['selling_price'] > $currentUser->coin) {
                return response()->json([
                    'status' => false,
                    'message' => "Low balance. Please deposit first!",
                    'data' => []
                ]);
            }

            // create verification   
            $result = Http::post('https://server.sms.numbersms.com/api/create_verification', [
                "areaCodeSelectOption" => [],
                "carrierSelectOption" => [],
                "serviceName" => $servicesData['service'],
                "capability" => strtolower($servicesData['capacity']),
                "serviceNotListedName" => $servicesData['service']
            ]);

            if ($result) {
                // user coin update
                $currentUser->coin = $currentUser->coin - $servicesData['selling_price'];
                $currentUser->save();

                // create usage history
                SmsHistory::create([
                    'user_id' => $currentUser->id,
                    'service' => $servicesData['service'],
                    'price' => $servicesData['selling_price'],
                    'status' => true
                ]);

                return response()->json([
                    'status' => true,
                    'message' => 'Verification created successfully',
                    'data' => $result->json()
                ]);
            } else {
                return response()->json([
                    'status' => false,
                    'message' => 'Verification created faild. try again!',
                    'data' => []
                ]);
            }
        } catch (\Exception $th) {
            return response()->json([
                'status' => false,
                'message' => $th->getMessage(),
                'data' => []
            ]);
        }
    }
}
