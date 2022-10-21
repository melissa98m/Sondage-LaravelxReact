<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Reponse extends Model
{
    use HasFactory;
    protected $fillable = ["reponse" , "question"];

    public function question(): BelongsTo
    {
        return $this->BelongsTo(Question::class, 'question');
    }
}
