<?php

use App\Http\Controllers\company\DashboardController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\subscriber\subscriberControler;
use App\Http\Controllers\super\HomeController;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "web" middleware group. Make something great!
|
*/

// Route::get('/', function () {
//     return view('welcome');
// });

Route::group(['namespace'=>'App\Http\Controllers\company','prefix'=>'company', 'middleware' =>'adminRole'], function(){
    Route::get('/', [DashboardController::class, 'index'])->name('company.index');
    Route::post('/logout',[DashboardController::class, 'logout'])->name('logout');
});


//Subscriber
Route::group(['namespace'=>'App\Http\Controllers\subscriber','middleware' =>'SubscribeRole'], function(){
     Route::get('/subscriber', [subscriberControler::class, 'index'])->name('subscriber.index');
});



Auth::routes();
Route::get('/', [App\Http\Controllers\HomeController::class, 'index'])->name('home');
// Route::get('/test',[HomeController::class,'dashboard'])->name('dash');