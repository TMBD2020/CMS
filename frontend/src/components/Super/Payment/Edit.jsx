import React, {Fragment, useEffect, useState} from 'react';
import {useSelector} from "react-redux";
// import store from "../../redux/store/store";
// import {OnChangeCustomerInput} from "../../redux/state-slice/customer-slice";
// import {CreateCustomerRequest, FillCustomerFormRequest} from "../../APIRequest/CustomerAPIRequest";
import {ErrorToast, IsEmpty,SuccessToast} from "../../../helper/FormHelper";
import {apiURL} from '../../../helper/http'
import { useForm } from "react-hook-form";
import {useNavigate, useParams} from "react-router-dom";


const PaymentEdit = () => {

    const [packages, setPackages] = useState();
    const [isDisable, setIsDisable] = useState(false);
    const [company,setCompany] = useState('');
    const [user,setUser] = useState();
    const [payments,setPayments] = useState();
    
    const params = useParams();
    const navigate = useNavigate();

    const { 
        register, 
        handleSubmit, 
        watch, 
        formState: { errors } 
        } = useForm({
            defaultValues: async () => {
                const res = await fetch('http://localhost:8000/api/payment/'+params.id, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json',
                    },
                });
                const result = await res.json();
                setPayments(result.data);
                return {
                    // date: result.data.date,
                    companyId: result.data.companyId,
                    userId: result.data.userId,
                    packageId: result.data.packageId,
                    amount: result.data.amount,
                    payFor: result.data.payFor,
                    status: result.data.status
                }
            }
        });

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
                        console.error('Error fetching company:', error);
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
        try {
            const res = await fetch('http://localhost:8000/api/payment/'+params.id, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                },
                body:JSON.stringify(data)
            });
            const result = await res.json();

          if(result.status == true){
            SuccessToast("Payment Updated Successfully!")
            navigate('/payments/show')
          }else{
            ErrorToast("Payment not updated!")
          }
        } catch (error) {
            console.error('Error fetching payment:', error);
        }
    }

    return (
        <Fragment>
            <div className="container-fluid">
                            <div className="row">
                                <div className="col-12">
                                    <div className="card mt-1">
                                        <div className="card-body">
                                            <div className="row">
                                                <h5>Detail Payment</h5>
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
                                                    <button  className="btn btn-sm my-3 btn-success">Update</button>
                                                </div>
                                            </div>
                                                </form>
                                                
                                            </div>
                                        </div>
                                    </div>
                                </div>
                               
                            </div>
                        </div>
        </Fragment>
    );
};

export default PaymentEdit;