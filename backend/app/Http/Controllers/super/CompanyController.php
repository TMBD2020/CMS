<?php

namespace App\Http\Controllers\super;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Company;
use App\Models\Package;
use App\Models\User;
use DB;
use DataTables;
use Illuminate\Support\Facades\Validator;
use Intervention\Image\ImageManager;
use Intervention\Image\Drivers\Imagick\Driver;

class CompanyController extends Controller
{
    // public function __construct()
    // {
    //     $this->middleware('auth:api', ['except' => ['login','register']]);
    // }
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $Company = Company::orderBy('created_at','ASC')->get();
        $totalCompany = Company::count();
        $Company=DB::table('companies')->leftJoin('packages','companies.packageId','packages.id')
                ->select('companies.*','packages.title as package_name')->get();

        return response()->json([
            'status' =>true,
            'data' => $Company,
            'totalCompany' => $totalCompany,
        ]);
    }

    /**
     * Show upload logo resource.
     */
    public function uploadLogo(Request $request) {
        $request->validate([ 
           'logo' => 'required|image|mimes:jpeg,png,jpg|max:2048', 
       ]);
         if ($request->hasFile('logo')) { 
           $logo = $request->file('logo'); 
           $logoName = time() . '.' . $logo->getClientOriginalExtension(); 
           $logo->move(public_path('upload/logo'), $logoName); 
           return response()->json([ 
            'status' => true, 
            'data' => ['logo' => $logoName], 
        ]); 
        } 
           return response()->json([ 
            'status' => false, 
            'message' => 'Failed to upload logo.',
         ],400); 
        }

    /**
     * Show upload trade licence photo resource.
     */
    public function uploadTradeLicencePhoto(Request $request) {
        $request->validate([ 
           'tradeLicencePhoto' => 'required|image|mimes:jpeg,png,jpg|max:2048', 
       ]);
         if ($request->hasFile('tradeLicencePhoto')) { 
           $photo = $request->file('tradeLicencePhoto'); 
           $photoName = time() . '.' . $photo->getClientOriginalExtension(); 
           $photo->move(public_path('upload/tradeLicencePhoto'), $photoName); 
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
            'packageId' => 'required|integer',
            'date' => 'required|date',
            'name' => 'required',
            'phone' => 'required',
            'startingBalance' =>'required',
            'sharePrice' => 'required',
            'logo' => 'nullable|required|image|mimes:jpeg,png,jpg|max:2048',
            'tradeLicencePhoto' => 'nullable|image|mimes:jpeg,png,jpg|max:2048',
        ]);

        if($validator->fails()){
            return response()->json([
                'status' =>false,
                'errors' =>$validator->errors()
            ]);
        }

          // Handle logo upload
    if ($request->hasFile('logo')) {
        $logo = $request->file('logo');
        $logoName = time() . '.' . $logo->getClientOriginalExtension();
        $logo->move(public_path('upload/logo'), $logoName); // Save in the upload folder
    }

    if ($request->hasFile('tradeLicencePhoto')) {
        $photo = $request->file('tradeLicencePhoto');
        $photoName = time() . '.' . $photo->getClientOriginalExtension();
        $photo->move(public_path('upload/tradeLicencePhoto'), $photoName); // Save in another folder
    }

        $model = new Company(); 
        $model->packageId = $request->packageId; 
        $model->date = $request->date; 
        $model->name = $request->name; 
        $model->email = $request->email; 
        $model->phone = $request->phone; 
        $model->address = $request->address; 
        $model->website = $request->website; 
        $model->startingBalance = $request->startingBalance; 
        $model->sharePrice = $request->sharePrice; 
        $model->tradeLicenceNo = $request->tradeLicenceNo; 
        $model->status = $request->status; 
        $model->logo = $logoName; // Store the path to the logo
        $model->tradeLicencePhoto =$photoName; // Store the path to the photo
        $model->save();

        return response()->json([
            'status' =>true,
            'message' =>'Company added successfully!'
        ]);
    }

    
    /**
     * Display the specified resource.
     */
    public function show($id)
    {
    $Company = Company::find($id);
    if ($Company == null) {
        return response()->json([
            'status' => false,
            'message' => 'Company not found!'
        ]);
    }

    return response()->json([
        'status' => true,
        'data' => $Company,
    ]);

    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id)
{
    $company = Company::find($id);

    if ($company == null) {
        return response()->json([
            'status' => false,
            'message' => 'Company not found!'
        ]);
    }

    $validator = Validator::make($request->all(), [
            'packageId' => 'required|integer',
            'date' => 'required|date',
            'name' => 'required',
            'phone' => 'required',
            'startingBalance' =>'required',
            'sharePrice' => 'required',
            'logo' => 'nullable|string|max:255'
    ]);

    if ($validator->fails()) {
        return response()->json([
            'status' => false,
            'errors' => $validator->errors()
        ]);
    }

    if ($request->hasFile('logo')) {
        $logo = $request->file('logo');
        $logoName = time() . '.' . $logo->getClientOriginalExtension();
        $logo->move(public_path('upload/logo'), $logoName); // Save in the upload folder
    }

    if ($request->hasFile('tradeLicencePhoto')) {
        $photo = $request->file('tradeLicencePhoto');
        $photoName = time() . '.' . $photo->getClientOriginalExtension();
        $photo->move(public_path('upload/tradeLicencePhoto'), $photoName); // Save in another folder
    }

    $company->packageId = $request->packageId; 
    $company->date = $request->date; 
    $company->name = $request->name; 
    $company->email = $request->email; 
    $company->phone = $request->phone; 
    $company->address = $request->address; 
    $company->website = $request->website; 
    $company->startingBalance = $request->startingBalance; 
    $company->sharePrice = $request->sharePrice; 
    $company->tradeLicenceNo = $request->tradeLicenceNo; 
    $company->status = $request->status; 
    $company->logo = $logoName; 
    $company->tradeLicencePhoto =$photoName;
    $company->save();

    return response()->json([
        'status' => true,
        'message' => 'Company updated successfully!'
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

    public function totalUser(){
        $totalUser = User::count();
        return response()->json([
            'status' =>true,
            'data' => $totalUser
        ]);
    }

    public function getUser(){
        $user = User::orderBy('created_at','ASC')->get();
        return response()->json([
            'status' =>true,
            'data' => $user
        ]);
    }
}
