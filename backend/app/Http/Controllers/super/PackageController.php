<?php

namespace App\Http\Controllers\super;

use App\Http\Controllers\Controller;
use App\Models\Package;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class PackageController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $package = Package::orderBy('created_at','ASC')->get();
        $totalPackage = Package::count();

        return response()->json([
            'status' =>true,
            'data' => $package,
            'totalPackage' => $totalPackage
        ]);
    }


    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(),[
            'title' => 'required',
            'monthlyFee' => 'required',
            'memberLimit' => 'required',
            'employeeLimit' =>'required',
            'accountLimit' => 'required'
        ]);

        if($validator->fails()){
            return response()->json([
                'status' =>false,
                'errors' =>$validator->errors()
            ]);

        }

        $model = new Package();
        $model->title = $request->title;
        $model->monthlyFee = $request->monthlyFee;
        $model->memberLimit = $request->memberLimit;
        $model->employeeLimit = $request->employeeLimit;
        $model->accountLimit = $request->accountLimit;
        $model->description = $request->description;
        $model->status = $request->status;
        $model->save();

        return response()->json([
            'status' =>true,
            'message' =>'Package added successfully!'
        ]);
    }

    /**
     * Display the specified resource.
     */
    public function show($id)
    {
    $package = Package::find($id);
    if ($package == null) {
        return response()->json([
            'status' => false,
            'message' => 'Package not found!'
        ]);
    }

    return response()->json([
        'status' => true,
        'data' => $package,
    ]);

    }

    /**
     * Update the specified resource in storage.
     */
    // public function update(Request $request, $id)
    // {
    //     $package = Package::find($id);

    //     if ($package == null){
    //         return response()->json([
    //             'status' =>false,
    //             'message' =>'Package not found!'
    //         ]);
    //     }
    //     $validator = Validator::make($request->all(),[
    //         'title' => 'required',
    //         'monthlyFee' => 'required',
    //         'memberLimit' => 'required',
    //         'employeeLimit' =>'required',
    //         'accountLimit' => 'required'
    //     ]);

    //     if($validator->fails()){
    //         return response()->json([
    //             'status' =>false,
    //             'errors' =>$validator->errors()
    //         ]);

    //     }

    //     $model->title = $request->title;
    //     $model->monthlyFee = $request->monthlyFee;
    //     $model->memberLimit = $request->memberLimit;
    //     $model->employeeLimit = $request->employeeLimit;
    //     $model->accountLimit = $request->accountLimit;
    //     $model->description = $request->description;
    //     $model->status = $request->status;
    //     $model->save();

    //     return response()->json([
    //         'status' =>true,
    //         'message' =>'Company updated successfully!'
    //     ]);
    // }

    public function update(Request $request, $id)
{
    $package = Package::find($id);

    if ($package == null) {
        return response()->json([
            'status' => false,
            'message' => 'Package not found!'
        ]);
    }

    $validator = Validator::make($request->all(), [
        'title' => 'required',
        'monthlyFee' => 'required',
        'memberLimit' => 'required',
        'employeeLimit' => 'required',
        'accountLimit' => 'required'
    ]);

    if ($validator->fails()) {
        return response()->json([
            'status' => false,
            'errors' => $validator->errors()
        ]);
    }

    $package->title = $request->title;
    $package->monthlyFee = $request->monthlyFee;
    $package->memberLimit = $request->memberLimit;
    $package->employeeLimit = $request->employeeLimit;
    $package->accountLimit = $request->accountLimit;
    $package->description = $request->description;
    $package->status = $request->status;
    $package->save();

    return response()->json([
        'status' => true,
        'message' => 'Package updated successfully!'
    ]);
}

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        $package = Package::find($id);
        if ($package == null) {
            return response()->json([
                'status' => false,
                'message' => 'Package not found!'
            ]);
        }

        $package->delete();
    
        return response()->json([
            'status' => true,
            'message' => 'Package delete successfully!'
            
        ]);
    }
}
