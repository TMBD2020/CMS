<?php

namespace App\Http\Controllers\client;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Patner;
use Illuminate\Support\Facades\Validator;
use Intervention\Image\ImageManager;
use Intervention\Image\Drivers\Imagick\Driver;

class PatnerController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $totalPatner = Patner::count();
        $patner = Patner::orderBy('created_at','ASC')->get();
        // $patner=DB::table('members')->leftJoin('companies','members.companyId','companies.id')
        //         ->select('members.*','companies.name as company_name')->get();

        return response()->json([
            'status' =>true,
            'data' => $patner,
            'totalPatner'=> $totalPatner
        ]);
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
            'totalShare' => 'required',
            'photo' => 'nullable|required|image|mimes:jpeg,png,jpg|max:2048',
            'nidPhoto' => 'nullable|required|image|mimes:jpeg,png,jpg|max:2048',
            'nPhoto' => 'nullable|required|image|mimes:jpeg,png,jpg|max:2048',
            'nNidPhoto' => 'nullable|required|image|mimes:jpeg,png,jpg|max:2048',
            'mManualFormPhoto' => 'nullable|required|image|mimes:jpeg,png,jpg|max:2048',
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
            $photo->move(public_path('upload/patner/photo'), $photoName); 
        }

        if ($request->hasFile('nidPhoto')) { 
            $nidPhoto = $request->file('nidPhoto'); 
            $nidPhotoName = time() . '.' . $nidPhoto->getClientOriginalExtension(); 
            $nidPhoto->move(public_path('upload/patner/nidphoto'), $nidPhotoName); 
        }

        if ($request->hasFile('nPhoto')) { 
            $nPhoto = $request->file('nPhoto'); 
            $nPhotoName = time() . '.' . $nPhoto->getClientOriginalExtension(); 
            $nPhoto->move(public_path('upload/patner/nomaniePhoto'), $nPhotoName); 
         }
         
         if ($request->hasFile('nNidPhoto')) {
            $nNidPhoto = $request->file('nNidPhoto');
            $nNidPhotoName = time() . '.' . $nNidPhoto->getClientOriginalExtension();
            $nNidPhoto->move(public_path('upload/patner/nomanieNidPhoto'), $nNidPhotoName); 
        }

        if ($request->hasFile('mManualFormPhoto')) {
            $mManualFormPhoto = $request->file('mManualFormPhoto');
            $mManualFormPhotoName = time() . '.' . $mManualFormPhoto->getClientOriginalExtension();
            $mManualFormPhoto->move(public_path('upload/patner/mManualFormPhoto'), $mManualFormPhotoName); 
        }
       
        $model = new Patner(); 
        $model->companyId = $request->companyId; 
        $model->jDate = $request->jDate; 
        $model->name = $request->name; 
        $model->email = $request->email; 
        $model->phone = $request->phone; 
        $model->address = $request->address; 
        $model->nName = $request->nName; 
        $model->designation = $request->designation; 
        $model->gender = $request->gender; 
        $model->bGroup = $request->bGroup; 
        $model->mName = $request->mName; 
        $model->fName = $request->fName; 
        $model->nidNo = $request->nidNo; 
        $model->totalShare = $request->totalShare; 
        $model->relationWithNominee = $request->relationWithNominee; 
        $model->photo = $photoName; 
        $model->nidPhoto = $nidPhotoName; 
        $model->nPhoto = $nPhotoName; 
        $model->nNidPhoto = $nNidPhotoName; 
        $model->mManualFormPhoto = $mManualFormPhotoName; 
        $model->status = $request->status; 
        $model->save();

        return response()->json([
            'status' =>true,
            'message' =>'Patner added successfully!'
        ]);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $patner = Patner::find($id);
        if($patner){
            return response()->json([
                'status' =>true,
                'data' => $patner
            ]);
        }else{
            return response()->json([
                'status' =>false,
                'message' =>'Patner not found!'
            ]);
        }
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
        $validator = Validator::make($request->all(),[
            'companyId' => 'required|integer',
            'jDate' => 'required|date',
            'name' => 'required',
            'totalShare' => 'required',
            'photo' => 'nullable|required|image|mimes:jpeg,png,jpg|max:2048',
            'nidPhoto' => 'nullable|required|image|mimes:jpeg,png,jpg|max:2048',
            'nPhoto' => 'nullable|required|image|mimes:jpeg,png,jpg|max:2048',
            'nNidPhoto' => 'nullable|required|image|mimes:jpeg,png,jpg|max:2048',
            'mManualFormPhoto' => 'nullable|required|image|mimes:jpeg,png,jpg|max:2048',
        ]);
        
        if($validator->fails()){
            return response()->json([
                'status' =>false,
                'errors' =>$validator->errors()
            ]);
        }

        $model = Patner::find($id);
        if ($model == null) {
            return response()->json([
                'status' => false,
                'message' => 'Patner information not found!'
            ]);
        }
        if ($request->hasFile('photo')) {
            $photo = $request->file('photo');
            $photoName = time() . '_photo.' . $photo->getClientOriginalExtension();
            $photo->move(public_path('upload/patner/photo'), $photoName); 
            $model->photo = $photoName;
        }
    
        if ($request->hasFile('nidPhoto')) { 
            $nidPhoto = $request->file('nidPhoto'); 
            $nidPhotoName = time() . '_nid.' . $nidPhoto->getClientOriginalExtension(); 
            $nidPhoto->move(public_path('upload/patner/nidphoto'), $nidPhotoName); 
            $model->nidPhoto = $nidPhotoName;
        }
        if ($request->hasFile('nPhoto')) { 
            $nPhoto = $request->file('nPhoto'); 
            $nPhotoName = time() . '.nPhoto' . $nPhoto->getClientOriginalExtension(); 
            $nPhoto->move(public_path('upload/patner/nomaniePhoto'), $nPhotoName); 
            $model->nPhoto = $nPhotoName;
         }
         if ($request->hasFile('nNidPhoto')) {
            $nNidPhoto = $request->file('nNidPhoto');
            $nNidPhotoName = time() . '.nNidPhoto' . $nNidPhoto->getClientOriginalExtension();
            $nNidPhoto->move(public_path('upload/patner/nomanieNidPhoto'), $nNidPhotoName);
            $model->nNidPhoto = $nNidPhotoName; 
        }

        if ($request->hasFile('mManualFormPhoto')) {
            $mManualFormPhoto = $request->file('mManualFormPhoto');
            $mManualFormPhotoName = time() . '.mManualFormPhoto' . $mManualFormPhoto->getClientOriginalExtension();
            $mManualFormPhoto->move(public_path('upload/patner/mManualFormPhoto'), $mManualFormPhotoName); 
            $model->mManualFormPhoto = $mManualFormPhotoName;
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
            $model->mName = $request->mName ?? $model->mName;
            $model->nName = $request->nName ?? $model->nName;
            $model->designation = $request->designation ?? $model->designation;
            $model->relationWithNominee = $request->relationWithNominee ?? $model->relationWithNominee;
            $model->totalShare = $request->totalShare ?? $model->totalShare;
            $model->nidNo = $request->nidNo ?? $model->nidNo;
            $model->status = $request->status ?? $model->status;
            $model->save();

            return response()->json([
                'status' => true,
                'message' => 'patner information updated successfully!'
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
