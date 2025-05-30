<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class CorsMiddleware
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle($request, Closure $next) 
    { 
        return $next($request) 
        ->header('Access-Control-Allow-Origin', '*') 
        ->header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS') 
        ->header('Access-Control-Allow-Headers', 'Origin, Content-Type, Accept, Authorization, X-Request-With'); 
    }
}
