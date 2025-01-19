<?php

use App\Http\Controllers\Api\AuthController;
use Illuminate\Support\Facades\Route;

// guest
Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);
Route::post('/forget-password', [AuthController::class, 'forgetPassword']);
Route::post('/reset-password', [AuthController::class, 'resetPassword']);

// authenticated 
Route::group([
    'middleware' => ['auth:api']
], function () {
    Route::get('/profile', [AuthController::class, 'profile']);
    Route::get('/refresh-token', [AuthController::class, 'refreshToken']);
    Route::get('/logout', [AuthController::class, 'logout']);
    Route::post('/upadte-profile', [AuthController::class, 'updateProfile']);
    Route::post('/sendotp', [AuthController::class, 'sendotp']);
    Route::post('/verifyemail', [AuthController::class, 'verifyEmail']);
});