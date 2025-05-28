import React, {Fragment, useEffect, useState} from 'react';
import {useSelector} from "react-redux";
// import store from "../../redux/store/store";
// import {OnChangeCustomerInput} from "../../redux/state-slice/customer-slice";
// import {CreateCustomerRequest, FillCustomerFormRequest} from "../../APIRequest/CustomerAPIRequest";
import {ErrorToast, IsEmpty,SuccessToast} from "../../../helper/FormHelper";
import {apiURL} from '../../../helper/http'
import { useForm } from "react-hook-form";
import {useNavigate} from "react-router-dom";


const EmployeeCreatePage = () => {

    useEffect(() => {
        document.title = "CMS ::Employee create";
    }, []);
    const { 
        register, 
        handleSubmit, 
        watch, 
        formState: { errors } 
        } = useForm();
        const [company,setCompany] = useState();
        const [designation,setDesignation] = useState();
        const [isDisable,setIsDisable] = useState(false);
        const [photoFile, setPhotoFile] = useState(null);
        const [nidPhotoFile, setNidPhotoFile] = useState(null);
         // State for image previews
    const [photoPreview, setPhotoPreview] = useState(null);
    const [nidPhotoPreview, setNidPhotoPreview] = useState(null);
    const navigate = useNavigate();

     const fetchDesignation = async () => {
            try {
                const res = await fetch('http://localhost:8000/api/designation', {
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
                setDesignation(result.data);
            } catch (error) {
                console.error('Error fetching designation:', error);
            } 
        }
        
        useEffect(() => {
            fetchDesignation();
        }, []);
    
    const fetchCompany = async () => {
        try {
            const res = await fetch('http://localhost:8000/api/companies', {
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
            setCompany(result.data);
        } catch (error) {
            console.error('Error fetching packages:', error);
        }
    }

    useEffect(() => {
        fetchCompany();
    }, []);

    const onSubmit = async(data) => {
           const formData = new FormData();
           formData.append('companyId', data.companyId);
           formData.append('jDate', data.jDate);
           formData.append('name', data.name);
           formData.append('email', data.email);
           formData.append('phone', data.phone);
           formData.append('address', data.address);
           formData.append('lName', data.lName);
           formData.append('designation_id', data.designation_id);
           formData.append('gender', data.gender);
           formData.append('bGroup', data.bGroup);
           formData.append('fName', data.fName);
           formData.append('nidNo', data.nidNo);
           formData.append('salary', data.salary);
           formData.append('status', data.status);
          
           if (photoFile) {
               formData.append('photo', photoFile);
           }
           if (nidPhotoFile) {
            formData.append('nidPhoto', nidPhotoFile); 
           }
           
           try {
               const res = await fetch('http://localhost:8000/api/employees', {
                   method: 'POST',
                   body: formData,
               });
       
               const result = await res.json();
   
             if(result.status == true){
               SuccessToast("Employees information addedd Successfully!")
               navigate('/employee/list')
             }else{
               ErrorToast("employees not add!")
             }
           } catch (error) {
               console.error('Error fetching employees:', error);
           }
       }

    const handleFile = (e) => {
        const file = e.target.files[0];
        setPhotoFile(file);
        setPhotoPreview(URL.createObjectURL(file));
    };
    const nidFile = (e) => {
        const file = e.target.files[0];
        setNidPhotoFile(file);
        setNidPhotoPreview(URL.createObjectURL(file));
    };

    return (
        <Fragment>
            <div className="container-fluid">
                <div className="row">
                    <div className="col-8">
                        <div className="card mt-1">
                            <div className="card-body">
                                <div className="row">
                                    <h5>Add Employees information</h5>
                                    <hr className="bg-light"/>
                                    <form onSubmit={handleSubmit(onSubmit)}>
                                        <div className="row">
                                            <div className="col-4 p-2">
                                                <label className="form-label">Join Date <span style={{ color: "red" }} title='required'>*</span></label>
                                                <input 
                                                 {
                                                    ...register('jDate',{
                                                        required: "Join Date field is required"
                                                        
                                                    })
                                                }
                                                className={`datepicker form-control form-control-sm ${ errors.jDate && 'invalid'}`} type="date"/>
                                                {                                                    
                                                errors.jDate && ErrorToast("Join Date field is required !")
                                                }
                                            </div>
                                            <div className="col-4 p-2">
                                                <label className="form-label">Employee Name <span style={{ color: "red" }} title='required'>*</span></label>
                                                <input 
                                                 {
                                                    ...register('name',{
                                                        required: "Member name field is required"
                                                        
                                                    })
                                                }
                                                className="form-control form-control-sm" type="text" />
                                                {
                                                    errors.name && ErrorToast("Member name field is required !")
                                                }
                                            </div>
                                            <div className="col-4 p-2">
                                                <label className="form-label">Gender <span style={{ color: "red" }} title='required'>*</span></label>
                                                <select 
                                                  {
                                                    ...register('gender', {
                                                    })
                                                    }
                                                className="form-select form-select-sm" id='exampleFormControlSelect1'>
                                                    <option value="" selected>Select</option>
                                                   <option value="men">Men</option>
                                                   <option value="women">Women</option>
                                                   <option value="other">Other</option>
                                                </select>
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
                                            </div>
                                            <div className="col-4 p-2">
                                                <label className="form-label">Company <span style={{ color: "red" }} title='required'>*</span></label>
                                                <select 
                                                  {
                                                    ...register('companyId', {
                                                        required: "Company field is required"
                                                    })
                                                    }
                                                className="form-select form-select-sm" id='exampleFormControlSelect1'>
                                                    <option value="" selected>Select</option>
                                                    {company && company.map(companyData => (
                                                      <option key={companyData.id} value={companyData.id}>{companyData.name}</option>
                                                  ))}
                                                </select>
                                                {
                                                    errors.companyId && ErrorToast("Company field is required !")
                                                }
                                            </div>
                                            <div className="col-4 p-2">
                                                <label className="form-label">Mobile No <span style={{ color: "red" }} title='required'>*</span></label>
                                                <input 
                                                {
                                                    ...register('phone')
                                                }
                                                className="form-control form-control-sm" type="text" />
                                               
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-4 p-2">
                                                <label className="form-label">Father Name</label>
                                                <input 
                                                    {
                                                    ...register('fName', {
                                                    })
                                                    }
                                                className="form-control form-control-sm" type="text" />
                                            </div>
                                            <div className="col-4 p-2">
                                                <label className="form-label">Mother Name</label>
                                                <input 
                                                  {
                                                    ...register('lName', {                                                
                                                    })
                                                    }
                                                className="form-control form-control-sm" type="text" />
                                            </div>
                                            <div className="col-4 p-2">
                                                <label className="form-label">Nid no</label>
                                                <input 
                                                  {
                                                    ...register('nidNo', {                                                        
                                                    })
                                                    }
                                                className="form-control form-control-sm" type="number" />
                                            </div>
                                        </div>
                                        <div className="row">
                                        <div className="col-4 p-2">
                                                <label className="form-label">Designation <span style={{ color: "red" }} title='required'>*</span></label>
                                                <select 
                                                  {
                                                    ...register('designation_id', {
                                                    })
                                                    }
                                                className="form-select form-select-sm" id='exampleFormControlSelect1'>
                                                    <option value="" selected>Select</option>
                                                    {designation && designation.map(designationData => (
                                                      <option key={designationData.id} value={designationData.id}>{designationData.name}</option>
                                                  ))}
                                                </select>
                                            </div>
                                            <div className="col-4 p-2">
                                                <label className="form-label">Blood group</label>
                                                <input 
                                                  {
                                                    ...register('bGroup', {                                                
                                                    })
                                                    }
                                                className="form-control form-control-sm" type="text" />
                                            </div>
                                            <div className="col-4 p-2">
                                            <label className="form-label">Salary</label>
                                                <input 
                                                  {
                                                    ...register('salary', {                                                
                                                    })
                                                    }
                                                className="form-control form-control-sm" type="text" />
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
                                                <label className="form-label">Employee Photo</label>
                                                <input
                                                    onChange={handleFile}
                                                    className="form-control form-control-md" type="file" />
                                                    <br />
                                                    { 
                                                    photoPreview && <img src={photoPreview} alt="Preview" width="180" />
                                                    }
                                            </div>
                                            <div className="col-4 p-2">
                                                <label className="form-label">Employee nid photo </label>
                                                <input
                                                    onChange={nidFile}
                                                    className="form-control form-control-md" type="file" />
                                                    <br />
                                                    {
                                                    nidPhotoPreview && <img src={nidPhotoPreview} alt="NID Preview" width="180" />
                                                    }
                                            </div>
                                          
                                        </div>

                                        
                                        <div className="row">
                                            <div className="col-4 p-2">
                                                <label className="form-label">Status <span style={{ color: "red" }} title='required'>*</span></label>
                                                <select className='form-control'
                                                    {
                                                    ...register('status')
                                                    }
                                                >
                                                    <option value="1">Active</option>
                                                    <option value="2">Inactive</option>
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

export default EmployeeCreatePage;