import React, {Fragment, useEffect, useState} from 'react';
import {useSelector} from "react-redux";
// import store from "../../redux/store/store";
// import {OnChangeCustomerInput} from "../../redux/state-slice/customer-slice";
// import {CreateCustomerRequest, FillCustomerFormRequest} from "../../APIRequest/CustomerAPIRequest";
import {ErrorToast, IsEmpty,SuccessToast} from "../../../helper/FormHelper";
import {apiURL} from '../../../helper/http'
import { useForm } from "react-hook-form";
import {useNavigate} from "react-router-dom";


const CompanyCreatePage = () => {

    useEffect(() => {
        document.title = "CMS :: company create";
    }, []);

    const { 
        register, 
        handleSubmit, 
        watch, 
        formState: { errors } 
        } = useForm();
        const [packages,setPackages] = useState();
        const [isDisable,setIsDisable] = useState(false);
        const [logoFile,setLogoFile] = useState(null);
        const [photoFile,setPhotoFile] = useState(null);


       const navigate = useNavigate();

       const fetchPackages = async () => {
        try {
            const res = await fetch('http://localhost:8000/api/packages', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                }
            });

            if (!res.ok) {
                throw new Error(`Network response was not ok: ${res.statusText}`);
            }

            const result = await res.json();
            setPackages(result.data);
        } catch (error) {
            console.error('Error fetching packages:', error);
        }
    }

    useEffect(() => {
        fetchPackages();
    }, []);

    const onSubmit = async(data) => {
        const formData = new FormData();

        formData.append('packageId', data.packageId);
        formData.append('date', data.date);
        formData.append('name', data.name);
        formData.append('email', data.email);
        formData.append('phone', data.phone);
        formData.append('address', data.address);
        formData.append('website', data.website);
        formData.append('startingBalance', data.startingBalance);
        formData.append('sharePrice', data.sharePrice);
        formData.append('tradeLicenceNo', data.tradeLicenceNo);
        formData.append('status', data.status);
        if (logoFile) {
            formData.append('logo', logoFile); 
        }
    
        if (photoFile) {
            formData.append('tradeLicencePhoto', photoFile);
        }

        try {
            const res = await fetch('http://localhost:8000/api/companies', {
                method: 'POST',
                body: formData, // Sending FormData instead of JSON string
            });
    
            const result = await res.json();

          if(result.status == true){
            SuccessToast("Company addedd Successfully!")
            navigate('/company/list')
          }else{
            ErrorToast("Company not add!")
          }
        } catch (error) {
            console.error('Error fetching company:', error);
        }
    }

    // Handle file change for logo upload
const handleFile = (e) => {
    const file = e.target.files[0];
    setLogoFile(file); 
};

// Handle file change for trade Licence Photo upload 
const handlePhotoFile = (e) => {
    const file = e.target.files[0];
    setPhotoFile(file); 
};

    // const handleFile  = async(e) => {
    //     const formData = new FormData(); 
    //     const file = e.target.files[0]; 
    //     formData.append("logo", file);
    //     try { 
    //         const response = await fetch('http://localhost:8000/api/upload-logo',
    //             {
    //                 method: 'POST',
    //                 headers: { 'Accept': 'application/json', },
    //                 body: formData
    //             }); 
    //         const result = await response.json(); 
    //         if (!response.ok) {
    //             throw new Error(result.errors.logo[0]);
    //         } if (result.status === false) {
    //             ErrorToast(result.errors.logo[0]);
    //         } else {
    //             setLogoId(result.data.logo);
    //         }
    //     } catch (error) {
    //         console.error('Error uploading logo:', error);
    //         ErrorToast(error.message);
    //     }
    // }

    // const handleTradePhoto = async (e) => {
    //     const formData = new FormData();
    //     const file = e.target.files[0];
    //     formData.append("photo", file);
    //     try {
    //         const response = await fetch('http://localhost:8000/api/upload-photo',
    //             {
    //                 method: 'POST',
    //                 headers: { 'Accept': 'application/json', },
    //                 body: formData
    //             });
    //         const result = await response.json();
    //         if (!response.ok) {
    //             throw new Error(result.errors.photo[0]);
    //         } if (result.status === false) {
    //             ErrorToast(result.errors.photo[0]);
    //         } else {
    //             setPhotoId(result.data.photo);
    //         }
    //     } catch (error) {
    //         console.error('Error uploading photo:', error);
    //         ErrorToast(error.message);
    //     }
    // }

    return (
        <Fragment>
            <div className="container-fluid">
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="row">
                    <div className="col-md-8">
                        <div className="card mt-1">
                            <div className="card-body">
                                <div className="row">
                                    <h5>Company information</h5>
                                    <hr className="bg-light"/>

                                        <div className="row">
                                            <div className="col-4 p-2">
                                                <label className="form-label">Date <span style={{ color: "red" }} title='required'>*</span></label>
                                                <input 
                                                 {
                                                    ...register('date',{
                                                        required: "Date field is required"
                                                        
                                                    })
                                                }
                                                className={`datepicker form-control form-control-sm ${ errors.date && 'invalid'}`} type="date"/>
                                                {                                                    
                                                errors.date && ErrorToast("Date field is required !")
                                                }
                                            </div>
                                            <div className="col-4 p-2">
                                                <label className="form-label">Company Name <span style={{ color: "red" }} title='required'>*</span></label>
                                                <input 
                                                 {
                                                    ...register('name',{
                                                        required: "Company name field is required"
                                                        
                                                    })
                                                }
                                                className="form-control form-control-sm" type="text" />
                                                {

                                                    errors.name && ErrorToast("Company name field is required !")
                                                }
                                            </div>
                                            <div className="col-4 p-2">
                                                <label className="form-label">Mobile No <span style={{ color: "red" }} title='required'>*</span></label>
                                                <input 
                                                {
                                                    ...register('phone',{
                                                        required: "Mobile No field is required"
                                                        
                                                    })
                                                }
                                                className="form-control form-control-sm" type="text" />
                                                {

                                                    errors.phone && ErrorToast("Mobile No field is required !")
                                                }
                                            </div>
                                        </div>
                                   
                                        <div className="row">
                                            <div className="col-4 p-2">
                                                <label className="form-label">Email <span style={{ color: "red" }} title='required'>*</span></label>
                                                <input 
                                                    {
                                                    ...register('email', {                                                        
                                                    })
                                                    }
                                                    className="form-control form-control-sm" type="text" />
                                                {

                                                    errors.email && ErrorToast("This field is required !")
                                                }
                                            </div>
                                            <div className="col-4 p-2">
                                                <label className="form-label">Packege <span style={{ color: "red" }} title='required'>*</span></label>
                                                <select 
                                                  {
                                                    ...register('packageId', {
                                                        required: "Package field is required"
                                                    })
                                                    }
                                                className="form-select form-select-sm" id='exampleFormControlSelect1'>
                                                    <option value="" selected>Select</option>
                                                    {packages && packages.map(packageData => (
                                                         <option key={packageData.id} value={packageData.id}>{packageData.title}</option> 
                                                         ))}
                                                </select>
                                                {

                                                    errors.packageId && ErrorToast("Package field is required !")
                                                }
                                            </div>
                                            <div className="col-4 p-2">
                                                <label className="form-label">Share Price <span style={{ color: "red" }} title='required'>*</span></label>
                                                <input 
                                                  {
                                                    ...register('sharePrice', {
                                                        required: "Share Price field is required"

                                                    })
                                                    }
                                                className="form-control form-control-sm" type="number" />
                                                {

                                                    errors.sharePrice && ErrorToast("Share Price field is required !")
                                                }
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-4 p-2">
                                                <label className="form-label">Starting balance</label>
                                                <input 
                                                    {
                                                    ...register('startingBalance', {
                                                        required: "Starting balance field is required"

                                                    })
                                                    }
                                                className="form-control form-control-sm" type="text" />
                                                {

                                                    errors.startingBalance && ErrorToast("Starting balance field is required !")
                                                }
                                            </div>
                                            <div className="col-4 p-2">
                                                <label className="form-label">Website</label>
                                                <input 
                                                  {
                                                    ...register('website', {                                                
                                                    })
                                                    }
                                                className="form-control form-control-sm" type="text" />
                                            </div>
                                            <div className="col-4 p-2">
                                                <label className="form-label">Trade licence no <span style={{ color: "red" }} title='required'>*</span></label>
                                                <input 
                                                  {
                                                    ...register('tradeLicenceNo', {                                                        
                                                    })
                                                    }
                                                className="form-control form-control-sm" type="text" />
                                            </div>
                                        </div>
                                        <div className="row">
                                        <div className="col-4 p-2">
                                                <label className="form-label">Company type <span style={{ color: "red" }} title='required'>*</span></label>
                                                <select 
                                                  {
                                                    ...register('company_type', {
                                                        required: "company type field is required"
                                                    })
                                                    }
                                                className="form-select form-select-sm" id='exampleFormControlSelect1'>
                                                    <option value="" selected>Select</option>
                                                         <option value="membership">Membership</option> 
                                                         <option value="patnership">Patnership</option> 
                                                         <option value="both">Both</option> 
                                                </select>
                                                {

                                                    errors.packageId && ErrorToast("Package field is required !")
                                                }
                                            </div>
                                        </div>
                                        <div className="row">
                                        <div className="col-6 p-2">
                                        <label className="form-label">Company Logo </label>
                                        <input 
                                        onChange={handleFile}
                                        className="form-control form-control-md" type="file"/>
                                    </div>
                                    <div className="col-6 p-2">
                                        <label className="form-label">Trade licence photo </label>
                                        <input 
                                        onChange={handlePhotoFile}
                                        className="form-control form-control-md" type="file"/>
                                    </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-12 p-2">
                                                <label className="form-label">Address <span style={{ color: "red" }} title='required'>*</span></label>
                                                <textarea 
                                                {
                                                    ...register('address', {                                                        
                                                    })
                                                    }
                                                className="form-control form-control-sm" rows={4} />
                                            </div>
                                        </div>
                                        <div className="row">
                                   <div className="col-4 p-2">
                                        <label className="form-label">Status <span style={{color: "red"}} title='required'>*</span></label>
                                        <select className='form-control' 
                                        {
                                            ...register('status')
                                        }
                                        >
                                            <option value="1">Active</option>
                                            <option value="2">Deactive</option>
                                        </select>
                                        {
                                        errors.status && ErrorToast("Status field is required !")
                                        }
                                    </div>
                                   </div>
                                    <div className="row">
                                    <div className="col-4 p-2">
                                        <button disabled={isDisable} className="btn btn-sm my-3 btn-success">Submit</button>
                                    </div>
                                </div>
                                   
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-4">
                        <div className="card mt-1">
                            <div className="card-body">
                                <div className="row">
                                    <h5 >Login info</h5>
                                    <hr className="bg-light"/>
                                
                                    <div className="col-6 p-2">
                                        <label className="form-label">Role</label>
                                        <select className="form-select form-select-sm" id='exampleFormControlSelect1'>
                                           <option selected>Select</option>
                                            <option value="1">Admin</option>
                                         </select>
                                      
                                    </div>
                                    <div className="col-6 p-2">
                                        <label className="form-label">Login Name</label>
                                        <input className="form-control form-control-sm" type="text"/>
                                    </div>
                                    <div className="col-6 p-2">
                                        <label className="form-label">Login Email </label>
                                        <input className="form-control form-control-sm" type="text"/>
                                    </div>
                                    <div className="col-6 p-2">
                                        <label className="form-label">Login Phone </label>
                                        <input className="form-control form-control-sm" type="text"/>
                                    </div>
                                    <div className="col-12 p-2">
                                        <label className="form-label">Nid Number</label>
                                        <input className="form-control form-control-sm" type="text"/>                                     
                                    </div>
                                    <div className="col-6 p-2">
                                        <label className="form-label">Password </label>
                                        <input  className="form-control form-control-sm" type="text"/>
                                    </div>
                                    <div className="col-6 p-2">
                                        <label className="form-label">Confirm Password </label>
                                        <input className="form-control form-control-sm" type="text"/>
                                    </div>
                                    <div className="col-6 p-2">
                                        <label className="form-label">Photo </label>
                                        <input  className="form-control form-control-md" type="file"/>
                                    </div>
                                    <div className="col-6 p-2">
                                        <label className="form-label">Nid Photo </label>
                                        <input className="form-control form-control-md" type="file"/>
                                    </div>
                                </div>
                              
                            </div>
                        </div>
                    </div>
                </div>
                </form>
            </div>
        </Fragment>
    );
};

export default CompanyCreatePage;