<?php

// use App\Http\Controllers\Auth\LoginController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\super\PackageController;
use App\Http\Controllers\super\CompanyController;
use App\Http\Controllers\super\PaymentController;
use App\Http\Controllers\super\NoticeController;
use App\Http\Controllers\client\MemberController;
use App\Http\Controllers\client\ProjectController;
use App\Http\Controllers\client\CompanynoticeController;
use App\Http\Controllers\client\BankAccountController;
use App\Http\Controllers\client\DesignationController;
use App\Http\Controllers\client\EmployeeController;
use App\Http\Controllers\client\PatnerController;
use App\Http\Controllers\client\CollectionsController;
use App\Http\Controllers\PermissionController;
use App\Http\Controllers\RolesController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

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

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::options('/{any}', function() {
    return response()->json();
})->where('any', '.*');

//Authentication
Route::post('/login',[AuthController::class,'login'] );

Route::group(['middleware'=>'api'],function(){
//Super Route
    //Package
    Route::post('packages', [PackageController::class,'store']);
    Route::get('packages', [PackageController::class,'index']);
    Route::get('packages/{id}', [PackageController::class,'show']);
    Route::put('packages/{id}', [PackageController::class,'update']);
    Route::delete('packages/{id}', [PackageController::class,'destroy']);

    //Payment
    Route::get('payment', [PaymentController::class,'index']);
    Route::post('payment', [PaymentController::class,'store']);
    Route::get('payment/{id}', [PaymentController::class,'show']);
    Route::put('payment/{id}', [PaymentController::class,'update']);

    //Notice
    Route::get('notice', [NoticeController::class,'index']);
    Route::post('notice', [NoticeController::class,'store']);
    Route::get('notice/{id}', [NoticeController::class,'show']);
    Route::put('notice/{id}', [NoticeController::class,'update']);
    Route::delete('notice/{id}', [NoticeController::class,'destroy']);

    //Company
    Route::post('companies', [CompanyController::class,'store']);
    Route::get('companies', [CompanyController::class,'index']);
    Route::get('companies/{id}', [CompanyController::class,'show']);
    Route::put('companies/{id}', [CompanyController::class,'update']);
    Route::delete('companies/{id}', [CompanyController::class,'destroy']);
    Route::post('/upload-logo', [CompanyController::class, 'uploadLogo']);
    Route::post('/upload-photo', [CompanyController::class, 'uploadTradeLicencePhoto']);

    //Client Route
    //Member
    Route::post('member', [MemberController::class,'store']);
    Route::get('member', [MemberController::class,'index']);
    Route::get('member/{id}', [MemberController::class,'show']);
    Route::put('member/{id}', [MemberController::class,'update']);
    Route::delete('member/{id}', [MemberController::class,'destroy']);
    //Project
    Route::post('project', [ProjectController::class,'store']);
    Route::get('project', [ProjectController::class,'index']);
    Route::get('project/{id}', [ProjectController::class,'show']);
    Route::put('project/{id}', [ProjectController::class,'update']);
    //Notice
    Route::get('notices', [CompanynoticeController::class,'index']);
    Route::post('notices', [CompanynoticeController::class,'store']);
    Route::get('notices/{id}', [CompanynoticeController::class,'show']);
    Route::put('notices/{id}', [CompanynoticeController::class,'update']);
    Route::delete('notices/{id}', [CompanynoticeController::class,'destroy']);
    //bankaccount
    Route::get('bankaccount', [BankAccountController::class,'index']);
    Route::post('bankaccount', [BankAccountController::class,'store']);
    Route::get('bankaccount/{id}', [BankAccountController::class,'show']);
    Route::put('bankaccount/{id}', [BankAccountController::class,'update']);
    Route::delete('bankaccount/{id}', [BankAccountController::class,'destroy']);
    //BalanceTransfer
    Route::get('balancetransfer', [BankAccountController::class,'index']);
    Route::post('balancetransfer', [BankAccountController::class,'store']);
    Route::get('balancetransfer/{id}', [BankAccountController::class,'show']);
    Route::put('balancetransfer/{id}', [BankAccountController::class,'update']);
    Route::delete('balancetransfer/{id}', [BankAccountController::class,'destroy']);
    //Designation 
    Route::get('designation', [DesignationController::class,'index']);
    Route::post('designation', [DesignationController::class,'store']);
    Route::get('designation/{id}', [DesignationController::class,'show']);
    Route::put('designation/{id}', [DesignationController::class,'update']);
    Route::delete('designation/{id}', [DesignationController::class,'destroy']);
    //Employee 
    Route::get('employees', [EmployeeController::class,'index']);
    Route::post('employees', [EmployeeController::class,'store']);
    Route::get('employees/{id}', [EmployeeController::class,'show']);
    Route::put('employees/{id}', [EmployeeController::class,'update']);
    Route::delete('employees/{id}', [EmployeeController::class,'destroy']);
    //Patner 
    Route::get('patner', [PatnerController::class,'index']);
    Route::post('patner', [PatnerController::class,'store']);
    Route::get('patner/{id}', [PatnerController::class,'show']);
    Route::put('patner/{id}', [PatnerController::class,'update']);
    Route::delete('patner/{id}', [PatnerController::class,'destroy']);
    //Notice
    Route::post('notice', [NoticeController::class, 'store']);
    Route::get('notice', [NoticeController::class, 'index']);
    Route::put('notice/{id}', [NoticeController::class, 'update']);
    Route::get('notice/{id}', [NoticeController::class, 'show']);
    Route::delete('notice/{id}', [NoticeController::class, 'destroy']);
    //Permission
    Route::get('permission', [PermissionController::class, 'index'])->name('permission.index');
    Route::post('permission', [PermissionController::class, 'store'])->name('permission.store');
    Route::get('permission/{id}', [PermissionController::class, 'edit'])->name('permission.edit');
    Route::post('permission/{id}', [PermissionController::class, 'update'])->name('permission.update');
    Route::delete('permission', [PermissionController::class, 'destroy'])->name('permission.delete');
    //Roles
    Route::get('roles', [RolesController::class, 'index']);
    Route::post('roles', [RolesController::class, 'store']);
    Route::get('roles/{id}', [RolesController::class, 'edit']);
    Route::post('roles/{id}', [RolesController::class, 'update']);
    Route::delete('roles', [RolesController::class, 'destroy']);
    //Collections
    //Receiveable Payment
    Route::get('receiveable-payment', [CollectionsController::class, 'receiveablePaymentIndex']);
    Route::post('receiveable-payment', [CollectionsController::class, 'receiveablePaymentsStore']);
    Route::get('receiveable-payment/{id}', [CollectionsController::class, 'receiveablePaymentShow']);
    Route::post('receiveable-payment/{id}', [CollectionsController::class, 'receiveablePaymentUpdate']);
    Route::delete('receiveable-payment', [CollectionsController::class, 'receiveablePaymentDestroy']);
    //projectRevenues
    Route::get('project-revenues', [CollectionsController::class, 'projectRevenuesIndex']);
    Route::post('project-revenues', [CollectionsController::class, 'projectRevenuesStore']);
    Route::get('project-revenues/{id}', [CollectionsController::class, 'projectRevenuesShow']);
    Route::post('project-revenues/{id}', [CollectionsController::class, 'projectRevenuesUpdate']);
    Route::delete('project-revenues', [CollectionsController::class, 'projectRevenuesDestroy']);
    //otherRevenues
    Route::get('other-revenues', [CollectionsController::class, 'otherRevenuesIndex']);
    Route::post('other-revenues', [CollectionsController::class, 'otherRevenuesStore']);
    Route::get('other-revenues/{id}', [CollectionsController::class, 'otherRevenuesShow']);
    Route::post('other-revenues/{id}', [CollectionsController::class, 'otherRevenuestUpdate']);
    Route::delete('other-revenues', [CollectionsController::class, 'otherRevenuestDestroy']);

    Route::get('user-data', [CompanyController::class,'getUser']);
    Route::get('total-user', [CompanyController::class,'totalUser']);
    Route::post('logout',[AuthController::class,'logout']);
    Route::post('refresh', [AuthController::class,'refresh']);
    Route::post('me',[AuthController::class,'me']);

});

