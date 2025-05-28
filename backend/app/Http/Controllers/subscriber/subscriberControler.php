<?php

namespace App\Http\Controllers\subscriber;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class subscriberControler extends Controller
{
    public function __construct()
    {
        $this->middleware('auth');
    }
    
    public function index(){
        return view('subscriber_pannel.subscriber');
    }
}
