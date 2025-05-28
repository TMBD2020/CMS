<?php

namespace App\Http\Controllers\super;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Account;
use App\Models\Company;
use App\Models\User;
use DB;
use DataTables;
use Illuminate\Support\Facades\Validator;

class PaymentController extends Controller
{
    //
    public function index()
    {
        $payment = Account::orderBy('created_at','ASC')->get();
        $payment = DB::table('accounts')
        ->leftJoin('companies', 'accounts.companyId', '=', 'companies.id')
        ->leftJoin('users', 'accounts.userId', '=', 'users.id')
        ->leftJoin('packages', 'accounts.packageId', '=', 'packages.id')
        ->select('accounts.*', 'companies.name as company_name', 'packages.title as package_name','users.name as user_name')
        ->get();

        return response()->json([
            'status' =>true,
            'data' => $payment
        ]);
    }
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(),[
            'packageId' => 'required|integer',
            'companyId' => 'required|integer',
            'userId' => 'required|integer',
            'payFor' => 'required',
            'amount' => 'required',
        ]);

        if($validator->fails()){
            return response()->json([
                'status' =>false,
                'errors' =>$validator->errors()
            ]);
        }

        $model = new Account(); 
        $model->packageId = $request->packageId;
        $model->userId  = $request->userId; 
        $model->companyId  = $request->companyId; 
        $model->payFor  = $request->payFor;
        $model->amount  = $request->amount; 
        $model->status  = $request->status; 
        $model->save();

        return response()->json([
            'status' =>true,
            'message' =>'Payment added successfully!'
        ]);
    }

    public function show($id)
    {
    $payment = Account::find($id);
    if ($payment == null) {
        return response()->json([
            'status' => false,
            'message' => 'Payment not found!'
        ]);
    }

    return response()->json([
        'status' => true,
        'data' => $payment,
    ]);

    }

    public function update(Request $request, $id)
    {
        $payment = Account::find($id);
    
        if ($payment == null) {
            return response()->json([
                'status' => false,
                'message' => 'Payment not found!'
            ]);
        }
    
        $validator = Validator::make($request->all(), [
            'packageId' => 'required|integer',
            'companyId' => 'required|integer',
            'userId' => 'required|integer',
            'payFor' => 'required',
            'amount' => 'required',
        ]);
    
        if ($validator->fails()) {
            return response()->json([
                'status' => false,
                'errors' => $validator->errors()
            ]);
        }
    
        $payment->packageId = $request->packageId;
        $payment->userId  = $request->userId; 
        $payment->companyId  =$request->companyId; 
        $payment->payFor  = $request->payFor;
        $payment->amount  = $request->amount; 
        $payment->status  = $request->status;  
       
        $payment->save();
    
        return response()->json([
            'status' => true,
            'message' => 'Payment updated successfully!'
        ]);
    }
}
