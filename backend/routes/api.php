<?php

use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\User\CoinShareController;
use App\Http\Controllers\Api\User\TransictionController;
use Illuminate\Support\Facades\Route;

// guest
Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);
Route::post('/forget-password', [AuthController::class, 'forgetPassword']);
Route::post('/reset-password', [AuthController::class, 'resetPassword']);
Route::post('/verifyemail', [AuthController::class, 'verifyEmail']);
Route::post('/sendotp', [AuthController::class, 'sendotp']);

// authenticated 
Route::group([
    'middleware' => ['auth:api']
], function () {
    Route::get('/profile', [AuthController::class, 'profile']);
    Route::get('/refresh-token', [AuthController::class, 'refreshToken']);
    Route::get('/logout', [AuthController::class, 'logout']);
    Route::post('/upadte-profile', [AuthController::class, 'updateProfile']);
    Route::post('/chanage-password', [AuthController::class, 'chanagePassword']);

    // for user
    Route::prefix('/app')->group(function () {
        Route::get('/transaction', [TransictionController::class, 'index']);
        Route::post('/share-token', [CoinShareController::class, 'shareToken']);
    });
});