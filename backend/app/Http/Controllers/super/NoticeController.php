<?php

namespace App\Http\Controllers\super;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Notice;
use Illuminate\Support\Facades\Validator;



class NoticeController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $notice = Notice::orderBy('created_at','ASC')->get();

        return response()->json([
            'status' =>true,
            'data' => $notice
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
            'title' => 'required',
        ]);

        if($validator->fails()){
            return response()->json([
                'status' =>false,
                'errors' =>$validator->errors()
            ]);

        }

        $model = new Notice();
        $model->title = $request->title;
        $model->description = $request->description;
        $model->status = $request->status;
        $model->save();

        return response()->json([
            'status' =>true,
            'message' =>'Notice added successfully!'
        ]);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $notice = Notice::find($id);
        if ($notice == null) {
            return response()->json([
                'status' => false,
                'message' => 'Notice not found!'
            ]);
        }
    
        return response()->json([
            'status' => true,
            'data' => $notice,
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
        $notice = Notice::find($id);
    
        if ($notice == null) {
            return response()->json([
                'status' => false,
                'message' => 'Notice not found!'
            ]);
        }
    
        $validator = Validator::make($request->all(),[
            'title' => 'required',
        ]);
    
        if ($validator->fails()) {
            return response()->json([
                'status' => false,
                'errors' => $validator->errors()
            ]);
        }
    
        $notice->title = $request->title;
        $notice->description = $request->description;
        $notice->status = $request->status;
        $notice->save();
    
        return response()->json([
            'status' => true,
            'message' => 'Notice updated successfully!'
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $notice = Notice::find($id);
        if ($notice == null) {
            return response()->json([
                'status' => false,
                'message' => 'Notice not found!'
            ]);
        }

        $notice->delete();
    
        return response()->json([
            'status' => true,
            'message' => 'Notice delete successfully!'
            
        ]);
    }
}
