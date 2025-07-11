<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Chat extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'chat_ref',
        'user_id',
    ];

    public function team()
    {
        return $this->belongsTo(Team::class);
    }

    public function messages()
    {
        return $this->hasMany(Message::class);
    }
}
