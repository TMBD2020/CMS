import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { ErrorToast, SuccessToast } from "../../../helper/FormHelper";

function BankAccountCreate() {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const [company,setCompany] = useState();

    const navigate = useNavigate();

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

    const onSubmit = async (data) => {
        try {
            const res = await fetch('http://localhost:8000/api/bankaccount', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                },
                body: JSON.stringify(data)
            });

            if (!res.ok) {
                throw new Error(`Network response was not ok: ${res.statusText}`);
            }

            const result = await res.json();
            if (result.status == true) {
                SuccessToast("Bank account addedd Successfully!")
                navigate('/bank-accounts/list')
            } else {
                ErrorToast("Bank account information not add!")
            }
        } catch (error) {
            console.error('Error fetching Bank account:', error);
        }
    }


    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-12">
                    <div className="card mt-1">
                        <div className="card-body">
                            <h5>Add Bank account information</h5>
                            <hr className="bg-light" />

                            {/* Form */}
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
                                                              <label className="form-label">Create Date <span style={{ color: "red" }} title='required'>*</span></label>
                                                              <input 
                                                                  {
                                                                      ...register('createdDate',{
                                                                          required: "createdDate field is required"
                                                                      })
                                                                  }
                                                                  className={`form-control form-control-sm ${ errors.createdDate && 'invalid'}`} type="date"/>
                                                                        {
                                                                            errors.createdDate && ErrorToast("created Date field is required !")
                                                                        }
                                                                   </div>
                                                              <div className="col-4 p-2">
                                                              <label className="form-label">Bank <span style={{ color: "red" }} title='required'>*</span></label>
                                                              <input 
                                                                  {
                                                                      ...register('bank',{
                                                                          required: "bank field is required"
                                                                      })
                                                                  }
                                                                  className={`form-control form-control-sm ${ errors.bank && 'invalid'}`} type="text"/>
                                                                        {
                                                                            errors.bank && ErrorToast("Bank field is required !")
                                                                        }
                                                              </div>
                                                              </div>
                                                              <div className="row">
                                                              <div className="col-4 p-2">
                                                                  <label className="form-label">Account Name <span style={{color: "red"}} title='required'>*</span></label>
                                                                  <input
                                                                   {
                                                                      ...register('accountName',{
                                                                          required: "accountName field is required"
                                                                      })
                                                                  }
                                                                  className={`form-control form-control-sm ${ errors.accountName && 'invalid'}`} type="text"/>
                                                                  {
                                                                      errors.accountName && ErrorToast("account Name field is required !")
                                                                  }
                                                              </div>
                                                             
                                                              <div className="col-4 p-2">
                                                                  <label className="form-label">Account Number <span style={{color: "red"}} title='required'>*</span></label>
                                                                  <input 
                                                                  {
                                                                      ...register('accountNo',{
                                                                          required: "Pay field is required"
                                                                      })
                                                                  }
                                                                  className={`form-control form-control-sm ${ errors.accountNo && 'invalid'}`} type="text"/>
                                                                  {
                                                                      errors.accountNo && ErrorToast("Account No is required !")
                                                                  }
                                                              </div>
                                                              <div className="col-4 p-2">
                                                                  <label className="form-label">Start Balance <span style={{color: "red"}} title='required'>*</span></label>
                                                                  <input 
                                                                  {
                                                                      ...register('startBalance',{
                                                                          required: "Start balance field is required"
                                                                      })
                                                                  }
                                                                  className={`form-control form-control-sm ${ errors.startBalance && 'invalid'}`} type="text"/>
                                                                  {
                                                                      errors.startBalance && ErrorToast("Start Balance is required !")
                                                                  }
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
                                                                      <option value="2">Inactive</option>
                                                                  </select>
                                                              </div>
                                                              </div>
                                                             
                          
                                                              </div>
                                                              
                                                          <div className="row">
                                                              <div className="col-12 p-2">
                                                                  <button  className="btn btn-sm my-3 btn-success">Submit</button>
                                                              </div>
                                                          </div>
                                                              </form>
                            {/* End of Form */}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default BankAccountCreate;
