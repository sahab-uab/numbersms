<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;

class TextVerifyApimake extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'app:text-verify-apimake';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'This command make new service list with our databse.';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        
        \Log::info('Custom task executed successfully!');
    }
}
