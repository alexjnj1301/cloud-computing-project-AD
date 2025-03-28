<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Message extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'sender',
        'content',
        'chat_id',
        'time',
    ];

    public function chat()
    {
        return $this->belongsTo(Chat::class);
    }

}
