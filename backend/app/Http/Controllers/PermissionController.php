<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Spatie\Permission\Models\Permission;


class PermissionController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $permissions = Permission::all();
        return response()->json([
            'status' => true,
            'data' => $permissions
        ]);
    }
    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|unique:permissions|min:3',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $permission = Permission::create([
            'name' => $request->name
        ]);

        return response()->json([
            'status' =>true,
            'message' =>'Permission added successfully!'
        ],201);

    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $permission = Permission::find($id);
        if (!$permission) {
            return response()->json(['error' => 'Permission not found'], 404);
        }
        
        return response()->json([
            'status' => true,
            'data' => $permission,
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
        $validator = Validator::make($request->all(), [
            'name' => 'required|unique:permissions,name,' . $id . '|min:3',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $permission = Permission::find($id);
        if (!$permission) {
            return response()->json(['error' => 'Permission not found'], 404);
        }

        $permission->update([
            'name' => $request->name
        ]);

        return response()->json([
            'status' => true,
            'message' => 'Permission updated successfully!'
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $permission = Permission::find($id);
        if (!$permission) {
            return response()->json(['error' => 'Permission not found'], 404);
        }

        $permission->delete();
        return response()->json(['success' => 'Permission deleted successfully']);
    }
}
