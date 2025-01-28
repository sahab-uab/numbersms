<?php

namespace App\Services;

use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Str;

class TextVerifiedService
{
    protected $baseUrl;
    protected $apiKey;
    protected $email;

    public function __construct()
    {
        $this->baseUrl = 'https://textverified.com';
        $this->apiKey = env('TEXTVERIFIED_API_KEY');
        $this->email = env('TEXTVERIFIED_EMAIL');
    }

    /**
     * Generate Bearer Token
     */
    public function generateBearerToken()
    {
        $token = Cache::get('textverified_token');

        if ($token) {
            return $token;
        }

        $response = Http::withHeaders([
            'X-API-KEY' => $this->apiKey,
            'X-API-USERNAME' => $this->email,
        ])->post(Str::finish($this->baseUrl, '/') . 'api/pub/v2/auth');

        if (!$response->successful()) {
            throw new \Exception('Failed to fetch bearer token: ' . $response->status());
        }

        $data = $response->json();
        Cache::put('textverified_token', $data['token'], now()->addMinutes(55));

        return $data['token'];
    }

    /**
     * Get Account Details
     */
    public function getAccountDetails($bearerToken)
    {
        $response = Http::withToken($bearerToken)
            ->get(Str::finish($this->baseUrl, '/') . "api/pub/v2/account/me");

        if (!$response->successful()) {
            throw new \Exception('Failed to fetch account details: ' . $response->status());
        }

        return $response->json();
    }
}
