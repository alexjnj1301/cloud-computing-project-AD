<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Project extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'name',
        'team_id',
        'user_id',
        'picture',
    ];

    public function team()
    {
        return $this->belongsTo(Team::class);
    }

    public function files()
    {
        return $this->hasMany(File::class);
    }
}
