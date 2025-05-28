import React, {Fragment, useEffect, useState} from 'react';
import {useSelector} from "react-redux";
// import store from "../../redux/store/store";
// import {OnChangeCustomerInput} from "../../redux/state-slice/customer-slice";
// import {CreateCustomerRequest, FillCustomerFormRequest} from "../../APIRequest/CustomerAPIRequest";
import {ErrorToast, IsEmpty,SuccessToast} from "../../../helper/FormHelper";
import {apiURL} from '../../../helper/http'
import { useForm } from "react-hook-form";
import {useNavigate, useParams} from "react-router-dom";


const CompanyEditPage = () => {

    useEffect(() => {
        document.title = "CMS :: company detail";
    }, []);

    const [packages, setPackages] = useState();
    const [isDisable, setIsDisable] = useState(false);
    const [logoFile, setLogoFile] = useState(null); 
    const [tradeLicencePhotoFile, setTradeLicencePhotoFile] = useState(null);
    const [company,setCompany] = useState('');
    const params = useParams();

    const navigate = useNavigate();

    const { 
        register, 
        handleSubmit, 
        watch, 
        formState: { errors } 
        } = useForm({
            defaultValues: async () => {
                const res = await fetch('http://localhost:8000/api/companies/'+params.id, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json',
                    },
                });
                const result = await res.json();
                setCompany(result.data);
                return {
                    date: result.data.date,
                    name: result.data.name,
                    phone: result.data.phone,
                    email: result.data.email,
                    packageId: result.data.packageId,
                    sharePrice: result.data.sharePrice,
                    startingBalance: result.data.startingBalance,
                    website: result.data.website,
                    tradeLicenceNo: result.data.tradeLicenceNo,
                    address: result.data.address,
                    status: result.data.status
                }
            }
        });

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

    // const onSubmit = async(data) => {
    //     const newData = {...data}
    //     try {
    //         const res = await fetch('http://localhost:8000/api/companies/'+params.id, {
    //             method: 'PUT',
    //             headers: {
    //                 'Content-Type': 'application/json',
    //                 'Accept': 'application/json',
    //             },
    //             body:JSON.stringify(newData)
    //         });
    //         const result = await res.json();

    //       if(result.status == true){
    //         SuccessToast("Company Updated Successfully!")
    //         navigate('/company/list')
    //       }else{
    //         ErrorToast("Company not updated!")
    //       }
    //     } catch (error) {
    //         console.error('Error fetching company:', error);
    //     }
    // }

    const onSubmit = async (data) => { 
        const formData = new FormData(); 
        for (const key in data) { 
        formData.append(key, data[key]); 
        } 
        if (logoFile) formData.append('logo', logoFile); 
        if (tradeLicencePhotoFile) formData.append('tradeLicencePhoto', tradeLicencePhotoFile); 
        try { 
        const res = await fetch(`http://localhost:8000/api/companies/${params.id}`, { 
        method: 'PUT', 
        headers: { 'Accept': 'application/json', }, 
        body: formData 
        }); 
        const result = await res.json();
         if (result.status) { SuccessToast('Company Updated Successfully!'); 
        navigate('/company/list'); 
        } 
        else {
         ErrorToast('Company not updated!'); 
        } } catch (error) { 
        console.error('Error updating company:', error);
        ErrorToast('Error updating company!');
         } };

    // const handleFile  = async(e) => {
    //     const formData = new FormData();
    //     const file = e.target.files[0]; 
    //     formData.append("logo", file);
    //     try { const response = await fetch('http://localhost:8000/api/upload-logo',
    //          {
    //             method: 'POST', 
    //             headers: { 'Accept': 'application/json', }, 
    //             body: formData 
    //         }); 
    //         const result = await response.json(); 
    //         if (!response.ok) { throw new Error(result.errors.logo[0]); 

    //         } if (result.status === false) { 
    //             ErrorToast(result.errors.logo[0]); 
    //         } else { 
    //             setLogoId(result.data.logo);
    //         } } catch (error)
    //          { console.error('Error uploading logo:', error); 
    //             ErrorToast(error.message); }
    // }

    return (
        <Fragment>
            <div className="container-fluid">
                <div className="row">
                    <div className="col-8">
                        <div className="card mt-1">
                            <div className="card-body">
                                <div className="row">
                                    <h5>Company Detail </h5>
                                    <hr className="bg-light"/>

                                    <form onSubmit={handleSubmit(onSubmit)}>
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
                                        <div className="col-6 p-2">
                                        <label className="form-label">Company Logo </label>
                                        <input 
                                        onChange={(e) => setLogoFile(e.target.files[0])}
                                        className="form-control form-control-md" type="file"/>
                                        <div className="p-2">
                                        {
                                        company.logo && <img src={'http://localhost:8000/upload/logo/'+company.logo} width={100} alt="" />
                                        }
                                        </div>
                                    </div>
                                    <div className="col-6 p-2">
                                        <label className="form-label">Trade licence photo </label>
                                        <input
                                        onChange={(e) => setTradeLicencePhotoFile(e.target.files[0])}
                                         className="form-control form-control-md" type="file"/>
                                          <div className="p-2">
                                        {
                                        company.tradeLicencePhoto && <img src={'http://localhost:8000/upload/tradeLicencePhoto/'+company.tradeLicencePhoto} width={100} alt="" />
                                        }
                                        </div>
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
                                        <button disabled={isDisable} className="btn btn-sm my-3 btn-success">Update</button>
                                    </div>
                                </div>
                                    </form>
                                </div>
                               
                                    

                            </div>
                        </div>
                    </div>
                    <div className="col-4">
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
            </div>
        </Fragment>
    );
};

export default CompanyEditPage;