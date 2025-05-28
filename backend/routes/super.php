<?php

use Illuminate\Support\Facades\Route;

use App\Http\Controllers\super\HomeController;
use Illuminate\Support\Facades\Auth;

Route::group(['namespace'=>'App\Http\Controllers\super','prefix'=>'super', 'middleware' =>'superRole'], function(){
    route::get('/', [HomeController::class, 'index'])->name('super.home');
    //Route::post('/logout',[HomeController::class, 'logout'])->name('logout');
});

















// route::get('/test',function(){
// echo 'test page';
// });

// //route::get('/home', 'HomeController@index')->name('super.home');

//route::get('/super/dashboard', [HomeController::class, 'index'])->name('super.home')->middleware('superRole');


//->middleware('superRole');
