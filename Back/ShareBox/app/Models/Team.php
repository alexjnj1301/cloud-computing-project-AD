<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Team extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'name',
        'picture',
    ];

    public function projects()
    {
        return $this->hasMany(Project::class);
    }

    public function users()
    {
        return $this->hasMany(TeamUser::class);
    }

}
