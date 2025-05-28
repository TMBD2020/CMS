<?php

namespace App\Http\Controllers\client;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use App\Models\Member;
use DB;
use DataTables;
use Intervention\Image\ImageManager;
use Intervention\Image\Drivers\Imagick\Driver;

class MemberController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $totalMember = Member::count();
        $member = Member::orderBy('created_at','ASC')->get();
        $member=DB::table('members')->leftJoin('companies','members.companyId','companies.id')
                ->select('members.*','companies.name as company_name')->get();

        return response()->json([
            'status' =>true,
            'data' => $member,
            'totalMember'=> $totalMember
        ]);
    }

     /**
     * Show upload photo resource.
     */
    public function photo(Request $request) {
        $request->validate([ 
           'photo' => 'required|image|mimes:jpeg,png,jpg|max:2048', 
       ]);
         if ($request->hasFile('photo')) { 
           $photo = $request->file('photo'); 
           $photoName = time() . '.' . $photo->getClientOriginalExtension(); 
           $photo->move(public_path('upload/member/photo'), $photoName); 
           return response()->json([ 
            'status' => true, 
            'data' => ['photo' => $photoName], 
        ]); 
        } 
           return response()->json([ 
            'status' => false, 
            'message' => 'Failed to upload photo.',
         ],400); 
        }

         /**
     * Show upload nidPhoto resource.
     */
    public function nidPhoto(Request $request) {
        $request->validate([ 
           'nidPhoto' => 'required|image|mimes:jpeg,png,jpg|max:2048', 
       ]);
         if ($request->hasFile('nidPhoto')) { 
           $nidPhoto = $request->file('nidPhoto'); 
           $nidPhotoName = time() . '.' . $nidPhoto->getClientOriginalExtension(); 
           $nidPhoto->move(public_path('upload/member/nPhoto'), $nidPhotoName); 
           return response()->json([ 
            'status' => true, 
            'data' => ['nidPhoto' => $nidPhotoName], 
        ]); 
        } 
           return response()->json([ 
            'status' => false, 
            'message' => 'Failed to upload photo.',
         ],400); 
        }

        /**
     * Show upload photo resource.
     */
    public function nPhoto(Request $request) {
        $request->validate([ 
           'nPhoto' => 'required|image|mimes:jpeg,png,jpg|max:2048', 
       ]);
         if ($request->hasFile('nPhoto')) { 
           $photo = $request->file('photo'); 
           $photoName = time() . '.' . $photo->getClientOriginalExtension(); 
           $photo->move(public_path('upload/member/photo'), $photoName); 
           return response()->json([ 
            'status' => true, 
            'data' => ['photo' => $photoName], 
        ]); 
        } 
           return response()->json([ 
            'status' => false, 
            'message' => 'Failed to upload photo.',
         ],400); 
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
            $photo->move(public_path('upload/member/photo'), $photoName); 
        }

        if ($request->hasFile('nidPhoto')) { 
            $nidPhoto = $request->file('nidPhoto'); 
            $nidPhotoName = time() . '.' . $nidPhoto->getClientOriginalExtension(); 
            $nidPhoto->move(public_path('upload/member/nidphoto'), $nidPhotoName); 
        }

        if ($request->hasFile('nPhoto')) { 
            $nPhoto = $request->file('nPhoto'); 
            $nPhotoName = time() . '.' . $nPhoto->getClientOriginalExtension(); 
            $nPhoto->move(public_path('upload/member/nomaniePhoto'), $nPhotoName); 
         }
         
         if ($request->hasFile('nNidPhoto')) {
            $nNidPhoto = $request->file('nNidPhoto');
            $nNidPhotoName = time() . '.' . $nNidPhoto->getClientOriginalExtension();
            $nNidPhoto->move(public_path('upload/member/nomanieNidPhoto'), $nNidPhotoName); 
        }

        if ($request->hasFile('mManualFormPhoto')) {
            $mManualFormPhoto = $request->file('mManualFormPhoto');
            $mManualFormPhotoName = time() . '.' . $mManualFormPhoto->getClientOriginalExtension();
            $mManualFormPhoto->move(public_path('upload/member/mManualFormPhoto'), $mManualFormPhotoName); 
        }
       
        $model = new Member(); 
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
            'message' =>'Member added successfully!'
        ]);
    }

    /**
     * Display the specified resource.
     */
    public function show($id)
    {
    $member = Member::find($id);
    if ($member == null) {
        return response()->json([
            'status' => false,
            'message' => 'Member not found!'
        ]);
    }
    return response()->json([
        'status' => true,
        'data' => $member,
    ]);

    }

//     public function update(Request $request, $id)
// {
//     $member = Member::find($id);

//     if ($member == null) {
//         return response()->json([
//             'status' => false,
//             'message' => 'members not found!'
//         ]);
//     }

//     $validator = Validator::make($request->all(), [
//         'companyId ' => 'required|integer',
//         'jDate' => 'required|date',
//         'name' => 'required',
//         'totalShare' => 'required',
//     ]);

//     if ($validator->fails()) {
//         return response()->json([
//             'status' => false,
//             'errors' => $validator->errors()
//         ]);
//     }

//     if($request->photo){
//         $photo = Member::find($request->photo);
//         if($photo !=null){
//             $extArray = explode('.',$photo->photo);
//             $ext = last($extArray);
//             $fileName = strtotime('now').$member->id.'.'.$ext;
//         }
//     }

//         $member->companyId = $request->companyId; 
//         $member->jDate = $request->jDate; 
//         $member->name = $request->name; 
//         $member->email = $request->email; 
//         $member->phone = $request->phone; 
//         $member->address = $request->address; 
//         $member->nName = $request->nName; 
//         $member->designation = $request->designation; 
//         $member->gender = $request->gender; 
//         $member->bGroup = $request->bGroup; 
//         $member->mName = $request->mName; 
//         $member->fName = $request->fName; 
//         $member->nidNo = $request->nidNo; 
//         $member->totalShare = $request->totalShare; 
//         $member->relationWithNominee = $request->relationWithNominee; 
//         $member->status = $request->status; 
//         $member->save();

       

//     return response()->json([
//         'status' => true,
//         'message' => 'Member updated successfully!'
//     ]);
// }

public function update(Request $request, $id)
{
    $validator = Validator::make($request->all(),[
        'companyId' => 'required|integer', 
        'jDate' => 'sometimes|required|date', 
        'name' => 'sometimes|required', 
        'totalShare' => 'sometimes|required',
        'photo' => 'nullable|image|mimes:jpeg,png,jpg|max:2048',
        'nidPhoto' => 'nullable|image|mimes:jpeg,png,jpg|max:2048',
        'nPhoto' => 'nullable|image|mimes:jpeg,png,jpg|max:2048',
        'nNidPhoto' => 'nullable|image|mimes:jpeg,png,jpg|max:2048',
        'mManualFormPhoto' => 'nullable|image|mimes:jpeg,png,jpg|max:2048',
    ]);

    if($validator->fails()){
        return response()->json([
            'status' => false,
            'errors' => $validator->errors()
        ]);
    }

    $member = Member::find($id);

    if (!$member) {
        return response()->json([
            'status' => false,
            'message' => 'Member not found!'
        ]);
    }

    if ($request->hasFile('photo')) {
        $photo = $request->file('photo');
        $photoName = time() . '.' . $photo->getClientOriginalExtension();
        $photo->move(public_path('upload/member/photo'), $photoName);
        $member->photo = $photoName;
    }

    if ($request->hasFile('nidPhoto')) {
        $nidPhoto = $request->file('nidPhoto');
        $nidPhotoName = time() . '.' . $nidPhoto->getClientOriginalExtension();
        $nidPhoto->move(public_path('upload/member/nidphoto'), $nidPhotoName);
        $member->nidPhoto = $nidPhotoName;
    }

    if ($request->hasFile('nPhoto')) {
        $nPhoto = $request->file('nPhoto');
        $nPhotoName = time() . '.' . $nPhoto->getClientOriginalExtension();
        $nPhoto->move(public_path('upload/member/nomaniePhoto'), $nPhotoName);
        $member->nPhoto = $nPhotoName;
    }

    if ($request->hasFile('nNidPhoto')) {
        $nNidPhoto = $request->file('nNidPhoto');
        $nNidPhotoName = time() . '.' . $nNidPhoto->getClientOriginalExtension();
        $nNidPhoto->move(public_path('upload/member/nomanieNidPhoto'), $nNidPhotoName);
        $member->nNidPhoto = $nNidPhotoName;
    }

    if ($request->hasFile('mManualFormPhoto')) {
        $mManualFormPhoto = $request->file('mManualFormPhoto');
        $mManualFormPhotoName = time() . '.' . $mManualFormPhoto->getClientOriginalExtension();
        $mManualFormPhoto->move(public_path('upload/member/mManualFormPhoto'), $mManualFormPhotoName);
        $member->mManualFormPhoto = $mManualFormPhotoName;
    }

    $member->companyId = $request->companyId;
    $member->jDate = $request->jDate;
    $member->name = $request->name;
    $member->email = $request->email;
    $member->phone = $request->phone;
    $member->address = $request->address;
    $member->nName = $request->nName;
    $member->designation = $request->designation;
    $member->gender = $request->gender;
    $member->bGroup = $request->bGroup;
    $member->mName = $request->mName;
    $member->fName = $request->fName;
    $member->nidNo = $request->nidNo;
    $member->totalShare = $request->totalShare;
    $member->relationWithNominee = $request->relationWithNominee;
    $member->status = $request->status;
    $member->save();

    return response()->json([
        'status' => true,
        'message' => 'Member updated successfully!'
    ]);
}


    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        $Company = Company::find($id);
        if ($Company == null) {
            return response()->json([
                'status' => false,
                'message' => 'Company not found!'
            ]);
        }

        $Company->delete();
    
        return response()->json([
            'status' => true,
            'message' => 'Company delete successfully!'
            
        ]);
    }
}
