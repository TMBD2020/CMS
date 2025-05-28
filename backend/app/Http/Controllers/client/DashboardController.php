<?php

namespace App\Http\Controllers\company;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class DashboardController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth');
    }
    public function index(){
        return view('dashboard.company');
    }

    public function logout()
    {
    	Auth::logout();
    	$notification=array('messege' => 'You are logged out!', 'alert-type' => 'success');
    	return redirect()->route('login')->with($notification);
    }
}
