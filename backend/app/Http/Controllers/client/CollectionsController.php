<?php

namespace App\Http\Controllers\client;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Account;
use Illuminate\Support\Facades\Validator;
use DB;
use DataTables;
use Illuminate\Support\Facades\Auth;


class CollectionsController extends Controller
{
    // Receiveable Payment

    public function receiveablePaymentIndex()
    {
        $index = Account::orderBy('created_at','ASC')->get();
        $activeBankaccCount = Account::where('status', 1)->count();
        return response()->json([
            'status' =>true,
            'data' => $index,
            'activeBankaccCount' => $activeBankaccCount
        ]);
    }

    public function receiveablePaymentsStore(Request $request)
    {
        $validator = Validator::make($request->all(),[
            'companyId' => 'required|integer',
            'date' => 'required|date',
            'memberId' => 'required',
            'totalShare' => 'required',
            'amount' => 'required',
            'payFor' => 'required',
        ]);

        if($validator->fails()){
            return response()->json([
                'status' =>false,
                'errors' =>$validator->errors()
            ]);

        }
        $userId = Auth::id();

        $model = new Account();
        $model->companyId = $request->companyId;
        $model->date = $request->date;
        $model->memberId = $request->memberId;
        $model->totalShare = $request->totalShare;
        $model->amount = $request->amount;
        $model->payFor = $request->payFor;
        $model->status = $request->status;
        $model->createdBy = $userId;
        $model->save();

        return response()->json([
            'status' =>true,
            'message' =>'Receiveable Payment added successfully!'
        ],201);
    }

   
    public function receiveablePaymentShow(string $id)
    {
        //
    }

  
   
    public function receiveablePaymentUpdate(Request $request, string $id)
    {
        //
    }

    public function receiveablePaymentDestroy(string $id)
    {
        //
    }

    //Project Revenues
    public function projectRevenuesIndex()
    {
        //
    }

    public function projectRevenuesStore(Request $request)
    {
        //
    }

   
    public function projectRevenuesShow(string $id)
    {
        //
    }

  
   
    public function projectRevenuesUpdate(Request $request, string $id)
    {
        //
    }

    public function projectRevenuesDestroy(string $id)
    {
        //
    }

    //other revenues 
    public function otherRevenuesIndex()
    {
        //
    }

    public function otherRevenuesStore(Request $request)
    {
        //
    }

   
    public function otherRevenuesShow(string $id)
    {
        //
    }

  
   
    public function otherRevenuestUpdate(Request $request, string $id)
    {
        //
    }

    public function otherRevenuestDestroy(string $id)
    {
        //
    }
}
