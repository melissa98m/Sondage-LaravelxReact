<?php

use App\Http\Controllers\API\QuestionController;
use App\Http\Controllers\API\ReponseController;
use App\Http\Controllers\API\SondageController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::apiResource('sondages', SondageController::class);
Route::apiResource('reponses', ReponseController::class);
Route::apiResource('questions', QuestionController::class);

Route::controller(ReponseController::class)->group(function () {
    Route::get('pourcent', 'getPourcentage');
});
