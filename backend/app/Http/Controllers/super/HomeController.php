<?php

namespace App\Http\Controllers\super;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;


class HomeController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth');
    }
    // public function index(){
    //     return view('welcome');
    // }
    public function index(){
        return view('dashboard.super');
    }

    public function logout()
    {
    	Auth::logout();
    	$notification=array('messege' => 'You are logged out!', 'alert-type' => 'success');
    	return redirect()->route('home')->with($notification);
    }
}
