<?php

use Illuminate\Support\Facades\Route;

Route::get('/login', function () {
    return redirect()->to('/login');
})->name('login');

Route::fallback(function () {
    return response()->view('errors.404', [], 404);
});
