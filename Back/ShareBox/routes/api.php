<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\ChatController;
use App\Http\Controllers\MessageController;
use App\Http\Controllers\FileUploadController;
use App\Http\Controllers\FileController;
use App\Http\Controllers\ProjectController;
use App\Http\Controllers\TeamController;

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

Route::group(['prefix' => 'team', 'middleware' => AUTH], function () {
    Route::get('/index', [TeamController::class, 'index']);
    Route::post('/store', [TeamController::class, 'store']);
    Route::get('/byUser/{userId}', [TeamController::class, 'teamByUserId']);
    Route::post('/addUser/{teamId}', [TeamController::class, 'addUserToTeam']);
    Route::get('/users/{teamId}', [TeamController::class, 'getUsersByTeamId']);
    Route::post('/removeUser/{teamId}', [TeamController::class, 'removeUserFromTeam']);
    Route::get('/listProjects/{teamId}', [TeamController::class, 'projectsByTeamId']);
});

Route::group(['prefix' => 'project', 'middleware' => AUTH], function () {
    Route::get('/index', [ProjectController::class, 'index']);
    Route::post('/store', [ProjectController::class, 'store']);
    Route::get('/byTeam/{teamId}', [ProjectController::class, 'projectsByTeamId']);
});

Route::group(['prefix' => 'file', 'middleware' => AUTH], function () {
    Route::get('/index', [FileController::class, 'index']);
    Route::post('/store', [FileController::class, 'store']);
    Route::delete('/destroy/{file}', [FileController::class, 'destroy']);
    Route::get('/byProject/{projectId}', [FileController::class, 'getFilesByProjectId']);
});

Route::post('upload', [FileUploadController::class, 'uploadFile'])->middleware(AUTH)->name('upload.file');
