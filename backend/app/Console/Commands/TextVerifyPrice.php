<?php

namespace App\Console\Commands;

use App\Models\Services;
use Illuminate\Console\Command;
use Illuminate\Log\Logger;
use Illuminate\Support\Facades\Http;

class TextVerifyPrice extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'app:text-verify-price';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'This commad get service price from textverify api';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        try {
            $servicesList = Services::where('price', 0)
                ->orWhere('selling_price', 0)
                ->first();

            if ($servicesList) {
                $price = Http::post('https://server.sms.numbersms.com/api/verification_pricing', [
                    "serviceName" => $servicesList['service'],
                    "areaCode" => true,
                    "carrier" => true,
                    "numberType" => "mobile",
                    "capability" => $servicesList['capacity']
                ]);
                $jsonPriceData = json_decode($price->body(), true);
                if ($jsonPriceData) {
                    if ($servicesList->price == 0 or $servicesList->price !== $jsonPriceData['pricing']['price']) {
                        $servicesList->price = $jsonPriceData['pricing']['price'];
                        $servicesList->selling_price = $jsonPriceData['pricing']['price'] * 0.90;
                        $servicesList->save();
                    }
                } else {
                    Logger()->info('Job erro ' . 'Api error');
                }
            } else {
                Logger()->info('Job erro ' . 'Database error');
            }
        } catch (\Exception $th) {
            Logger()->info('Job erro ' . $th->getMessage());
        }
    }
}
