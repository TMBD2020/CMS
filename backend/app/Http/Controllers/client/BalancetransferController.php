<?php

namespace App\Http\Controllers\client;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Account;
use Illuminate\Support\Facades\Validator;
use DB;
use DataTables;

class BalancetransferController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(),[
            'date' => 'required|date',
            'transferType' => 'required|string',
            'bank' => 'required|string',
            'bankAccountId' => 'required|numeric',
            'amount' => 'required|numeric',

        ]);

        if($validator->fails()){
            return response()->json([
                'status' =>false,
                'errors' =>$validator->errors()
            ]);

        }

        $model = new Account();
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
        //
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
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
