<?php

use Illuminate\Support\Facades\Route;

// ui login page
Route::get('/login', function () {
    return redirect()->to(env('UI_URL').'/login');
})->name('login');

Route::fallback(function () {
    return response()->view('errors.404', [], 404);
});
