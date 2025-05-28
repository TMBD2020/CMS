import React, {Fragment, useEffect, useState} from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
//import {BaseURL} from '../../src/helper/config';
import { useForm } from "react-hook-form";
import {ErrorToast, IsEmpty,SuccessToast} from "../../../helper/FormHelper";


function PackageCreate() {

    const { 
        register, 
        handleSubmit, 
        watch, 
        formState: { errors } 
        } = useForm();

       const navigate = useNavigate();

    const onSubmit = async(data) => {
        try {
            const res = await fetch('http://localhost:8000/api/packages', {
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
            SuccessToast("Package addedd Successfully!")
            navigate('/package/list')
          }else{
            ErrorToast("Package not add!")
          }
        } catch (error) {
            console.error('Error fetching packages:', error);
        }
    }

    

//   let FormValue=useSelector((state)=>(state.customer.FormValue));
//   let navigate=useNavigate();
//   let [ObjectID,SetObjectID]=useState(0);

//   useEffect(()=>{
//       let params= new URLSearchParams(window.location.search);
//       let id=params.get('id');
//       if(id!==null){
//           SetObjectID(id);
//           (async () => {
//               await FillCustomerFormRequest(id);
//           })();
//       }
//   },[])

//   const SaveChange = async () => {
//     if(IsEmpty(FormValue.CustomerName)){
//         ErrorToast("Customer Name Required !")
//     }
//     else if(IsEmpty(FormValue.Phone)){
//         ErrorToast("Customer Phone  Number Required !")
//     }
//     else if(IsEmail(FormValue.Email)){
//         ErrorToast("Valid Email Address Required !")
//     }
//     else {
//         if(await CreateCustomerRequest(FormValue,ObjectID)){
//             navigate("/CustomerListPage")
//         }
//     }
// }

  return (
    <div>
   <div className="container-fluid">
                <div className="row">
                    <div className="col-12">
                        <div className="card mt-1">
                            <div className="card-body">
                                <div className="row">
                                    <h5>Add Package</h5>
                                    <hr className="bg-light"/>

                                    <form onSubmit={handleSubmit(onSubmit)}>
                                        <div className="row">
                                    <div className="col-8 p-2">
                                        <label className="form-label">Package name <span style={{color: "red"}} title='required'>*</span></label>
                                        <input 
                                        {
                                            ...register('title',{
                                                required: "This field is required"
                                                
                                            })
                                        }
                                        className={`form-control form-control-sm ${ errors.title && 'invalid'}`} type="text"/>
                                        {
                                            
                                        errors.title && ErrorToast("This field is required !")
                                        }
                                    </div>
                                    <div className="col-4 p-2">
                                        <label className="form-label">Monthly fee <span style={{color: "red"}} title='required'>*</span></label>
                                        <input 
                                         {
                                            ...register('monthlyFee',{
                                                required: "This field is required"
                                            })
                                        }
                                        className={`form-control form-control-sm ${ errors.monthlyFee && 'invalid'}`} type="text"/>
                                        {
                                            errors.monthlyFee && ErrorToast("This field is required !")
                                        }
                                    </div>
                                    </div>
                                    <div className="row">
                                    <div className="col-3 p-2">
                                        <label className="form-label">Member limit <span style={{color: "red"}} title='required'>*</span></label>
                                        <input
                                         {
                                            ...register('memberLimit',{
                                                required: "This field is required"
                                            })
                                        }
                                        className={`form-control form-control-sm ${ errors.memberLimit && 'invalid'}`} type="number"/>
                                        {
                                            errors.memberLimit && ErrorToast("This field is required !")
                                        }
                                    </div>
                                   
                                    <div className="col-3 p-2">
                                        <label className="form-label">Employee limit <span style={{color: "red"}} title='required'>*</span></label>
                                        <input 
                                        {
                                            ...register('employeeLimit',{
                                                required: "This field is required"
                                            })
                                        }
                                        className={`form-control form-control-sm ${ errors.employeeLimit && 'invalid'}`} type="number"/>
                                        {
                                            errors.employeeLimit && ErrorToast("This field is required !")
                                        }
                                    </div>

                                    <div className="col-3 p-2">
                                        <label className="form-label">Account limit</label>
                                        <input 
                                          {
                                            ...register('accountLimit',{
                                                required: "This field is required"
                                            })
                                        }
                                        className={`form-control form-control-sm ${ errors.accountLimit && 'invalid'}`} type="number"/>
                                        {
                                            errors.accountLimit && ErrorToast("This field is required !")
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
                                            <option value="2">Deactive</option>
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

export default PackageCreate
