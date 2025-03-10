<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Transaction extends Model
{
    protected $table = 'transactions';

    protected $fillable = [
        'user_id',
        'username',
        'getway',
        'amount',
        'pay_id',
        'status'
    ];
}
