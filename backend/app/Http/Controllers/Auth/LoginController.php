<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Foundation\Auth\AuthenticatesUsers;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class LoginController extends Controller
{
    /*
    |--------------------------------------------------------------------------
    | Login Controller
    |--------------------------------------------------------------------------
    |
    | This controller handles authenticating users for the application and
    | redirecting them to your home screen. The controller uses a trait
    | to conveniently provide its functionality to your applications.
    |
    */

    use AuthenticatesUsers;

    /**
     * Where to redirect users after login.
     *
     * @var string
     */
    protected $redirectTo = '/home';

    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware('guest')->except('logout');
        $this->middleware('auth')->only('logout');
    }

    //unique:users

    public function login(Request $request)
    {
        $validator = $request->validate([
            'email' => 'required|email',
            'password' => 'required'
        ]);
        
        if(auth()->attempt(array(
            'email' => $request->email, 
            'password' => $request->password, 
        ))){
            if(auth()->user()->user_type=="super"){
                return redirect()->route('super.home');
            }elseif(auth()->user()->user_type=="client"){
                return redirect()->route('company.index');
            }elseif(auth()->user()->user_type=="subscriber"){
                return redirect()->route('subscriber.index');
            }
        }else{
            return redirect()->back()->with('error','invalid email or password');
        }
    }

    // public function adminlogin(){
    //     return view('auth.admin_login');
    // }
}
