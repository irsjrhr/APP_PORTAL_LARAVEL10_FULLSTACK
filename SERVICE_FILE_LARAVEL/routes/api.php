<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\File_controller;

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

// Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
//     return $request->user();
// });


Route::get('/testing_api', function (){

    return response()->json( ['testing' => "shandy"] );

});

Route::prefix('file')->controller(File_controller::class)->group(function () {
    Route::get('/get_data', 'get_data');                // GET /file
    Route::post('/post_tambah_file', 'post_tambah_file');       // POST /file
    Route::get('/get_data_kapasitas', 'get_data_kapasitas');
    Route::post('/testing', 'testing');
});


