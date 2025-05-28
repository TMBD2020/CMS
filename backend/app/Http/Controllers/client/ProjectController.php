<?php

namespace App\Http\Controllers\client;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Project;
use DB;
use DataTables;
use Illuminate\Support\Facades\Validator;

class ProjectController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $totalProject = Project::count();
        $project = Project::orderBy('created_at','ASC')->get();
        $project=DB::table('projects')->leftJoin('companies','projects.companyId','companies.id')
                ->select('projects.*','companies.name as company_name')->get();

        return response()->json([
            'status' =>true,
            'data' => $project,
            'totalProject' => $totalProject
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
            'startDate' => 'required|date',
            'title' => 'required',
        ]);

        if($validator->fails()){
            return response()->json([
                'status' =>false,
                'errors' =>$validator->errors()
            ]);
        }

        $model = new Project(); 
        $model->companyId  = $request->companyId; 
        $model->title  = $request->title;
        $model->startDate  = $request->startDate; 
        $model->budget  = $request->budget;
        $model->incomeHeads  = $request->incomeHeads;
        $model->expenseHeads  = $request->expenseHeads;
        $model->description  = $request->description;
        $model->status  = $request->status; 
        $model->save();

        return response()->json([
            'status' =>true,
            'message' =>'Project added successfully!'
        ]);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $project = Project::find($id);
        if ($project == null) {
            return response()->json([
                'status' => false,
                'message' => 'Project not found!'
            ]);
        }
        return response()->json([
            'status' => true,
            'data' => $project,
        ]);
    
        }


    /**
     * Update the specified resource in storage.
     */
    // public function update(Request $request, string $id)
    // {
    //     $project = Project::find($id);
    
    //     if ($project == null) {
    //         return response()->json([
    //             'status' => false,
    //             'message' => 'Project not found!'
    //         ]);
    //     }
    
    //     $validator = Validator::make($request->all(),[
    //         'companyId' => 'required|integer',
    //         'startDate' => 'required|date',
    //         'title' => 'required',
    //     ]);
    
    //     if ($validator->fails()) {
    //         return response()->json([
    //             'status' => false,
    //             'errors' => $validator->errors()
    //         ]);
    //     }
    
    //     $project->companyId  = $request->companyId; 
    //     $project->title  = $request->title;
    //     $project->startDate  = $request->startDate; 
    //     $project->budget  = $request->budget;
    //     $project->incomeHeads  = $request->incomeHeads;
    //     $project->expenseHeads  = $request->expenseHeads;
    //     $project->description  = $request->description;
    //     $project->status  = $request->status; 
    //     $project->save();
    
    //     return response()->json([
    //         'status' => true,
    //         'message' => 'Project updated successfully!'
    //     ]);
    // }
    public function update(Request $request, string $id)
{
    $validator = Validator::make($request->all(), [
        'companyId' => 'sometimes|integer',
         'startDate' => 'sometimes|required|date',
         'title' => 'sometimes',
     ]);
 
     if ($validator->fails()) {
         return response()->json([
             'status' => false,
             'errors' => $validator->errors()
         ]);
     }

    $model = Project::find($id);
    if ($model == null) {
        return response()->json([
            'status' => false,
            'message' => 'Project not found!'
        ]);
    }

    // Update fields only if they exist in the request
    $model->companyId = $request->companyId ?? $model->companyId;
    $model->title = $request->title ?? $model->title;
    $model->startDate = $request->startDate ?? $model->startDate;
    $model->budget = $request->budget ?? $model->budget;
    $model->incomeHeads = $request->incomeHeads ?? $model->incomeHeads;
    $model->expenseHeads = $request->expenseHeads ?? $model->expenseHeads;
    $model->description = $request->description ?? $model->description;
    $model->status = $request->status ?? $model->status;
    $model->save();

    return response()->json([
        'status' => true,
        'message' => 'Project updated successfully!'
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
