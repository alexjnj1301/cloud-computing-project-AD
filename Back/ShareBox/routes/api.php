<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\ChatController;
use App\Http\Controllers\MessageController;

define('AUTH', 'auth:sanctum');

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware(AUTH)->get('/user', function (Request $request) {
    return $request->user();
});

Route::post('/register', [AuthController::class, 'register'])->name('register');
Route::post('/login', [AuthController::class, 'login'])->name('login');
Route::get('/logout', [AuthController::class, 'logout'])->middleware(AUTH)->name('logout');

Route::group(['prefix' => 'chat', 'middleware' => AUTH], function () {
    Route::get('/index', [ChatController::class, 'index']);
    Route::get('/show/{id}', [ChatController::class, 'show']);
    Route::post('/store', [ChatController::class, 'store']);
    Route::patch('/update/{id}', [ChatController::class, 'update']);
    Route::delete('/destroy/{id}', [ChatController::class, 'destroy']);
});

Route::group(['prefix' => 'message', 'middleware' => AUTH], function () {
    Route::get('/index', [MessageController::class, 'index']);
    Route::get('/show/{id}', [MessageController::class, 'show']);
    Route::post('/store', [MessageController::class, 'store']);
    Route::patch('/update/{id}', [MessageController::class, 'update']);
    Route::delete('/destroy/{id}', [MessageController::class, 'destroy']);
});
