<?php

namespace App\Http\Controllers\client;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Designation;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;
class DesignationController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $designation = Designation::orderBy('created_at','ASC')->get();
        return response()->json([
            'status' =>true,
            'data' => $designation
        ]);
    }


    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(),[
            'companyId' => 'required|integer',
            'designationFor' => 'required',
            'name' => 'required',
        ]);
        

        if($validator->fails()){
            return response()->json([
                'status' =>false,
                'errors' =>$validator->errors()
            ]);
        }

        $model = new Designation();
        $model->companyId  = $request->companyId ;
        $model->designationFor = $request->designationFor;
        $model->name = $request->name;
        $model->level = $request->level;
        $model->description = $request->description;
        // $model->createdBy = Auth::id();
        $model->createdBy = Auth::id();
        $model->status = $request->status;
        $model->save();

        return response()->json([
            'status' =>true,
            'message' =>'Designation added successfully!'
        ]);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $designation = Designation::find($id);
    if ($designation == null) {
        return response()->json([
            'status' => false,
            'message' => 'Designation information not found!'
        ]);
    }
    return response()->json([
        'status' => true,
        'data' => $designation,
    ]);
    }

    /**
     * Update the specified resource in storage.
     */
    
        public function update(Request $request, $id)
        {
            $validator = Validator::make($request->all(),[
                'companyId' => 'sometimes|integer',
                'designationFor' => 'sometimes|required',
                'name' => 'sometimes|required',
                'level' => 'sometimes|required',
                'description' => 'sometimes|required',
                'status' => 'sometimes|required',
            ]);
        
            if($validator->fails()){
                return response()->json([
                    'status' => false,
                    'errors' => $validator->errors()
                ]);
            }
        
            $model = Designation::find($id);
            if (!$model) {
                return response()->json([
                    'status' => false,
                    'message' => 'Designation not found'
                ]);
            }
        
            $model->companyId = $request->companyId ?? $model->companyId;
            $model->designationFor = $request->designationFor ?? $model->designationFor;
            $model->name = $request->name ?? $model->name;
            $model->level = $request->level ?? $model->level;
            $model->description = $request->description ?? $model->description;
            $model->status = $request->status ?? $model->status;
            $model->save();
        
            return response()->json([
                'status' => true,
                'message' => 'Designation updated successfully!'
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
