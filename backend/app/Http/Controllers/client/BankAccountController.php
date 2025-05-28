<?php

namespace App\Http\Controllers\client;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Bankaccount;
use Illuminate\Support\Facades\Validator;
use DB;
use DataTables;

class BankAccountController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $index = Bankaccount::orderBy('created_at','ASC')->get();
        $activeBankaccCount = Bankaccount::where('status', 1)->count();
        return response()->json([
            'status' =>true,
            'data' => $index,
            'activeBankaccCount' => $activeBankaccCount
        ]);
    }


    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(),[
            'companyId' => 'required|integer',
            'createdDate' => 'required|date',
            'bank' => 'required',
            'accountName' => 'required',
            'accountNo' => 'required',
            'startBalance' => 'required',

        ]);

        if($validator->fails()){
            return response()->json([
                'status' =>false,
                'errors' =>$validator->errors()
            ]);

        }

        $model = new Bankaccount();
        $model->companyId = $request->companyId;
        $model->createdDate = $request->createdDate;
        $model->bank = $request->bank;
        $model->accountName = $request->accountName;
        $model->accountNo = $request->accountNo;
        $model->startBalance = $request->startBalance;
        $model->status = $request->status;
        $model->save();

        return response()->json([
            'status' =>true,
            'message' =>'Bank account information added successfully!'
        ]);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $bank = Bankaccount::find($id);
    if ($bank == null) {
        return response()->json([
            'status' => false,
            'message' => 'Bank account information not found!'
        ]);
    }
    return response()->json([
        'status' => true,
        'data' => $bank,
    ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $bank = Bankaccount::find($id);
    
        if ($bank == null) {
            return response()->json([
                'status' => false,
                'message' => 'Bank account information not found!'
            ]);
        }
    
        $validator = Validator::make($request->all(),[
            'bank' => 'required',
        ]);
    
        if ($validator->fails()) {
            return response()->json([
                'status' => false,
                'errors' => $validator->errors()
            ]);
        }
    
        $bank->companyId = $request->companyId;
        $bank->createdDate = $request->createdDate;
        $bank->bank = $request->bank;
        $bank->accountName = $request->accountName;
        $bank->accountNo = $request->accountNo;
        $bank->startBalance = $request->startBalance;
        $bank->status = $request->status;
        $bank->save();
    
        return response()->json([
            'status' => true,
            'message' => 'Bank account information updated successfully!'
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
