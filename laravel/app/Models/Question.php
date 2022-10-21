<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Question extends Model
{
    use HasFactory;
    protected $fillable = ["value" , "sondage"];

    public function sondage(): BelongsTo
    {
        return $this->BelongsTo(Sondage::class, 'sondage');
    }
}
