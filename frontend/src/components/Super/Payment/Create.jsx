import React, {Fragment, useEffect, useState} from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
//import {BaseURL} from '../../src/helper/config';
import { useForm } from "react-hook-form";
import {ErrorToast, IsEmpty,SuccessToast} from "../../../helper/FormHelper";


function PaymentCreate() {

    const {
        register, 
        handleSubmit, 
        watch, 
        formState: { errors } 
        } = useForm();
        const [packages,setPackages] = useState();
        const [company,setCompany] = useState();
        const [user,setUser] = useState();


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

        const fetchUser = async () => {
            try {
                const res = await fetch('http://localhost:8000/api/user-data', {
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
                setUser(result.data);
            } catch (error) {
                console.error('Error fetching user:', error);
            }
        }
    
        useEffect(() => {
            fetchUser();
        }, []);

    const onSubmit = async(data) => {
        try {
            const res = await fetch('http://localhost:8000/api/payment', {
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
            SuccessToast("Payment addedd Successfully!")
            navigate('/payments/show')
          }else{
            ErrorToast("Payment not add!")
          }
        } catch (error) {
            console.error('Error fetching Payments:', error);
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
                                    <h5>Add Payment</h5>
                                    <hr className="bg-light"/>

                                    <form onSubmit={handleSubmit(onSubmit)}>
                                        <div className="row">
                                    <div className="col-4 p-2">
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
                                    <div className="col-4 p-2">
                                    <label className="form-label">Pay user <span style={{ color: "red" }} title='required'>*</span></label>
                                              <select
                                                  {
                                                  ...register('userId', {
                                                      required: "Payment field is required"
                                                  })
                                                  }
                                                  className="form-select form-select-sm" id='exampleFormControlSelect1'>
                                                  <option value="" selected>Select</option>
                                                  {user && user.map(userData => (
                                                      <option key={userData.id} value={userData.id}>{userData.name}</option>
                                                  ))}
                                              </select>
                                              {
                                                  errors.userId && ErrorToast("payFor field is required !")
                                              }
                                         </div>
                                    <div className="col-4 p-2">
                                    <label className="form-label">Package <span style={{ color: "red" }} title='required'>*</span></label>
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
                                    </div>
                                    <div className="row">
                                    <div className="col-3 p-2">
                                        <label className="form-label">Amount <span style={{color: "red"}} title='required'>*</span></label>
                                        <input
                                         {
                                            ...register('amount',{
                                                required: "Amount field is required"
                                            })
                                        }
                                        className={`form-control form-control-sm ${ errors.amount && 'invalid'}`} type="number"/>
                                        {
                                            errors.amount && ErrorToast("Amount field is required !")
                                        }
                                    </div>
                                   
                                    <div className="col-3 p-2">
                                        <label className="form-label">Pay for <span style={{color: "red"}} title='required'>*</span></label>
                                        <input 
                                        {
                                            ...register('payFor',{
                                                required: "Pay field is required"
                                            })
                                        }
                                        className={`form-control form-control-sm ${ errors.payFor && 'invalid'}`} type="text"/>
                                        {
                                            errors.payFor && ErrorToast("Pay field is required !")
                                        }
                                    </div>

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

export default PaymentCreate
