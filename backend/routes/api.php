<?php

use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\PaymentController;
use App\Http\Controllers\Api\SmsController;

use App\Http\Controllers\Api\User\CoinShareController;
use App\Http\Controllers\Api\User\SmsHistoryController;
use App\Http\Controllers\Api\User\SupportController;
use App\Http\Controllers\Api\User\TransictionController;

use App\Http\Controllers\Api\Admin\AlluserController as admin_AlluserController;
use App\Http\Controllers\Api\Admin\CreaditController as admin_CreaditConnntroller;
use App\Http\Controllers\Api\Admin\SmsHistoryController as admin_SmsHistoryController;
use App\Http\Controllers\Api\Admin\TrannsictionController as admin_TransictionController;

use Illuminate\Support\Facades\Route;

// guest
Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);
Route::post('/forget-password', [AuthController::class, 'forgetPassword']);
Route::post('/reset-password', [AuthController::class, 'resetPassword']);
Route::post('/verifyemail', [AuthController::class, 'verifyEmail']);
Route::post('/sendotp', [AuthController::class, 'sendotp']);

// payment
Route::controller(PaymentController::class)->group(function () {
    Route::get('/payment-success', 'success')->name('pay_success');
    Route::get('/payment-failed', 'faild')->name('pay_faild');
});

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

        Route::post('/create-support', [SupportController::class, 'index']);
        Route::get('/allsupport', [SupportController::class, 'getSupport']);

        Route::get('/get-smsHistory', [SmsHistoryController::class, 'getSmsHistory']);
    });

    // for admin
    Route::prefix('/admin')->group(function () {
        Route::controller(admin_AlluserController::class)->group(function () {
            Route::post('/deleteuser', 'deluser');
            Route::post('/userolechnage', 'userRoleChnage');
            Route::get('/getalluser', 'allUsers');
        });
        Route::controller(admin_SmsHistoryController::class)->group(function () {
            Route::get('/get-smshistory', 'getSmsHistory');
        });
        Route::post('/addblance', [admin_CreaditConnntroller::class, 'index']);
        Route::get('/transaction', [admin_TransictionController::class, 'index']);
    });

    // payment
    Route::controller(PaymentController::class)->group(function () {
        Route::post('/payment', 'createPayment');
    });

    // sms
    Route::controller(SmsController::class)->group(function () {
        Route::get('/get-services', 'getServices');
        Route::post('/create-verify', 'createVerify');
    });
});
