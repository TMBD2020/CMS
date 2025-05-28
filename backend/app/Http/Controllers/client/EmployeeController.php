<?php

namespace App\Http\Controllers\client;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Employee;
use Illuminate\Support\Facades\Validator;
use Intervention\Image\ImageManager;
use Intervention\Image\Drivers\Imagick\Driver;
use DB;
use DataTables;

class EmployeeController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $totalDesignation = Employee::count();
        $employeeData = Employee::orderBy('created_at','ASC')->get();
        $employeeData=DB::table('employees')
                ->leftJoin('designations','employees.designation_id','designations.id')
                ->select('employees.*','designations.name as designations_name')->get();
        return response()->json([
            'status' =>true,
            'data' => $employeeData,
            'totalDesignation' => $totalDesignation
        ]);
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
            'companyId' => 'required|integer',
            'jDate' => 'required|date',
            'name' => 'required',
            'photo' => 'nullable|required|image|mimes:jpeg,png,jpg|max:2048',
        ]);
        
        if($validator->fails()){
            return response()->json([
                'status' =>false,
                'errors' =>$validator->errors()
            ]);
        }

        if ($request->hasFile('photo')) {
            $photo = $request->file('photo');
            $photoName = time() . '.' . $photo->getClientOriginalExtension();
            $photo->move(public_path('upload/employee/photo'), $photoName); 
        }

        if ($request->hasFile('nidPhoto')) { 
            $nidPhoto = $request->file('nidPhoto'); 
            $nidPhotoName = time() . '.' . $nidPhoto->getClientOriginalExtension(); 
            $nidPhoto->move(public_path('upload/employee/nidphoto'), $nidPhotoName); 
        }

        $model = new Employee();
        $model->companyId  = $request->companyId ;
        $model->jDate = $request->jDate;
        $model->name = $request->name;
        $model->email = $request->email;
        $model->phone = $request->phone;
        $model->address = $request->address;
        $model->designation_id = $request->designation_id;
        $model->bGroup	 = $request->bGroup;
        $model->gender = $request->gender;
        $model->fName = $request->fName;
        $model->lName = $request->lName;
        $model->salary = $request->salary;
        $model->nidNo = $request->nidNo;
        $model->photo = $request->$photoName;
        $model->nidPhoto = $request->$nidPhotoName;
        $model->status = $request->status;
        $model->save();

        return response()->json([
            'status' =>true,
            'message' =>'Employee information added successfully!'
        ]);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $employee = Employee::find($id);
        if ($employee == null) {
            return response()->json([
                'status' => false,
                'message' => 'Employee information not found!'
            ]);
        }
        return response()->json([
            'status' => true,
            'data' => $employee,
        ]);
    }

    
    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $validator = Validator::make($request->all(),[
            'companyId' => 'sometimes|integer',
            'jDate' => 'sometimes|date',
            'name' => 'sometimes',
            'photo' => 'nullable|sometimes|image|mimes:jpeg,png,jpg|max:2048',
        ]);
        
        if($validator->fails()){
            return response()->json([
                'status' =>false,
                'errors' =>$validator->errors()
            ]);
        }

        $model = Employee::find($id);
        if ($model == null) {
            return response()->json([
                'status' => false,
                'message' => 'Employee information not found!'
            ]);
        }
        if ($request->hasFile('photo')) {
            $photo = $request->file('photo');
            $photoName = time() . '_photo.' . $photo->getClientOriginalExtension();
            $photo->move(public_path('upload/employee/photo'), $photoName); 
            $model->photo = $photoName;
        }
    
        if ($request->hasFile('nidPhoto')) { 
            $nidPhoto = $request->file('nidPhoto'); 
            $nidPhotoName = time() . '_nid.' . $nidPhoto->getClientOriginalExtension(); 
            $nidPhoto->move(public_path('upload/employee/nidphoto'), $nidPhotoName); 
            $model->nidPhoto = $nidPhotoName;
        }
            $model->companyId = $request->companyId ?? $model->companyId;
            $model->jDate = $request->jDate ?? $model->jDate;
            $model->name = $request->name ?? $model->name;
            $model->email = $request->email ?? $model->email;
            $model->phone = $request->phone ?? $model->phone;
            $model->address = $request->address ?? $model->address;
            $model->bGroup	 = $request->bGroup ?? $model->bGroup;
            $model->gender = $request->gender ?? $model->gender;
            $model->fName = $request->fName ?? $model->fName;
            $model->lName = $request->lName ?? $model->lName;
            $model->salary = $request->salary ?? $model->salary;
            $model->nidNo = $request->nidNo ?? $model->nidNo;
            $model->status = $request->status ?? $model->status;
            $model->save();

            return response()->json([
                'status' => true,
                'message' => 'Employee updated successfully!'
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
