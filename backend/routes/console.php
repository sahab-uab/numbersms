<?php

use App\Console\Commands\TextVerifyApimake;
use Illuminate\Foundation\Inspiring;
use Illuminate\Support\Facades\Artisan;

// Artisan::command('inspire', function () {
//     $this->comment(Inspiring::quote());
// })->purpose('Display an inspiring quote')->hourly();


// make new service list
Schedule::command(TextVerifyApimake::class)->daily();