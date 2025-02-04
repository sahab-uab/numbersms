<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class SmsHistory extends Model
{
    // table
    protected $table = 'sms_histories';

    protected $fillable = [
        'user_id',
        'service',
        'price',
        'status'
    ];
}
