import React, {Fragment, useEffect, useState} from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
//import {BaseURL} from '../../src/helper/config';
import { useForm } from "react-hook-form";
import {ErrorToast, IsEmpty,SuccessToast} from "../../../helper/FormHelper";


function DesignationCreate() {

    useEffect(() => {
        document.title = "CMS ::  Designation create";
    }, []);
    const [company,setCompany] = useState();

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

    const { 
        register, 
        handleSubmit, 
        watch, 
        formState: { errors } 
        } = useForm();

       const navigate = useNavigate();

    const onSubmit = async(data) => {
        try {
            const res = await fetch('http://localhost:8000/api/designation', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                },
                body:JSON.stringify(data)
            });

            if (!res.ok) {
                throw new Error(`Network response was not ok: ${res.statusText}`);
            }

            const result = await res.json();
          if(result.status == true){
            SuccessToast("Designation addedd Successfully!")
            navigate('/designation/list')
          }else{
            ErrorToast("designation not add!")
          }
        } catch (error) {
            console.error('Error fetching packages:', error);
        }
    }

  return (
    <div>
   <div className="container-fluid">
                <div className="row">
                    <div className="col-12">
                        <div className="card mt-1">
                            <div className="card-body">
                                <div className="row">
                                    <h5>Add Designation</h5>
                                    <hr className="bg-light"/>

                                    <form onSubmit={handleSubmit(onSubmit)}>
                                        <div className="row">
                                    <div className="col-3 p-2">
                                              <label className="form-label">Company <span style={{ color: "red" }} title='required'>*</span></label>
                                              <select
                                                  {
                                                  ...register('companyId', {
                                                      required: "Payment field is required"
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
                                    <div className="col-3 p-2">
                                              <label className="form-label">Designation for <span style={{ color: "red" }} title='required'>*</span></label>
                                              <select
                                                  {
                                                  ...register('designationFor', {
                                                      required: "designation field is required"
                                                  })
                                                  }
                                                  className="form-select form-select-sm" id='exampleFormControlSelect1'>
                                                  <option value="" selected>Select</option>
                                                      <option  value="Member">Member</option>
                                                      <option  value="Employee">Employee</option>
                                              </select>
                                              {
                                                  errors.designationFor && ErrorToast("Company field is required !")
                                              }
                                    </div>
                                    <div className="col-3 p-2">
                                        <label className="form-label">Name <span style={{color: "red"}} title='required'>*</span></label>
                                        <input
                                         {
                                            ...register('name',{
                                                required: "This field is required"
                                            })
                                        }
                                        className={`form-control form-control-sm ${ errors.name && 'invalid'}`} type="text"/>
                                        {
                                            errors.name && ErrorToast("This field is required !")
                                        }
                                    </div>
                                   
                                    <div className="col-3 p-2">
                                        <label className="form-label">Level<span style={{color: "red"}} title='required'>*</span></label>
                                        <input 
                                        {
                                            ...register('level',{
                                                required: "This field is required"
                                            })
                                        }
                                        className={`form-control form-control-sm ${ errors.level && 'invalid'}`} type="number"/>
                                        {
                                            errors.level && ErrorToast("This field is required !")
                                        }
                                    </div>

                                    </div>    
                                   <div className="row">
                                   <div className="col-12 p-2">
                                        <label className="form-label">Description</label>
                                        <textarea 
                                        {
                                            ...register('description')
                                        }
                                        className={`form-control form-control-sm ${ errors.description && 'invalid'}`} rows={4}/>
                                        {
                                            errors.description && <p className='invalid-feedback'>{ errors.description?.message}</p>
                                        }
                                    </div>
                                   </div>
                                   
                                   <div className="row">
                                   <div className="col-3 p-2">
                                        <label className="form-label">Status <span style={{color: "red"}} title='required'>*</span></label>
                                        <select className='form-control' 
                                          {
                                            ...register('status')
                                        }
                                        >
                                            <option value="1">Active</option>
                                            <option value="2">Inactive</option>
                                        </select>
                                    </div>
                                   </div>
                                <div className="row">
                                    <div className="col-12 p-2">
                                        <button  className="btn btn-sm my-3 btn-success">Submit</button>
                                    </div>
                                </div>
                                    </form>
                                    
                                </div>
                            </div>
                        </div>
                    </div>
                   
                </div>
            </div>
    </div>
  )
}

export default DesignationCreate
