import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useForm } from "react-hook-form";
import { ErrorToast, SuccessToast } from "../../../../helper/FormHelper";

function bankEdit() {
    const [notices, setNotices] = useState();
    const params = useParams();
    const navigate = useNavigate();

    const { 
        register, 
        handleSubmit, 
        setValue, 
        formState: { errors } 
    } = useForm({
        defaultValues: async () => {
            const res = await fetch('http://localhost:8000/api/bankaccount/' + params.id, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                },
            });
            const result = await res.json();
            return {
                createdDate: result.data.createdDate,
                bank: result.data.bank,
                accountName: result.data.accountName,
                accountNo: result.data.accountNo,
                startBalance: result.data.startBalance,
                status: result.data.status
            };
        }
    });

    useEffect(() => {
        const fetchNotice = async () => {
            const res = await fetch('http://localhost:8000/api/notices/' + params.id, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                },
            });
            const result = await res.json();
            setValue('title', result.data.title);
            setValue('description', result.data.description);
            setValue('status', result.data.status);
        };
        fetchNotice();
    }, [params.id, setValue]);

    const onSubmit = async(data) => {
        try {
            const res = await fetch('http://localhost:8000/api/bankaccount/'+params.id, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                },
                body:JSON.stringify(data)
            });
            const result = await res.json();

          if(result.status == true){
            SuccessToast("Bank account information Updated Successfully!")
            navigate('/bank-accounts/list')
          }else{
            ErrorToast("bank account not updated!")
          }
        } catch (error) {
            console.error('Error fetching payment:', error);
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
                                    <h5>Detail Bank account information</h5>
                                    <hr className="bg-light" />
                                    <form onSubmit={handleSubmit(onSubmit)}>
                                        <div className="row">
                                    
                                            <div className="col-4 p-2">
                                                <label className="form-label">Create Date <span style={{ color: "red" }} title='required'>*</span></label>
                                                <input
                                                    {
                                                    ...register('createdDate', {
                                                        required: "createdDate field is required"
                                                    })
                                                    }
                                                    className={`form-control form-control-sm ${errors.createdDate && 'invalid'}`} type="date" />
                                                {
                                                    errors.createdDate && ErrorToast("created Date field is required !")
                                                }
                                            </div>
                                            <div className="col-4 p-2">
                                                <label className="form-label">Bank <span style={{ color: "red" }} title='required'>*</span></label>
                                                <input
                                                    {
                                                    ...register('bank', {
                                                        required: "bank field is required"
                                                    })
                                                    }
                                                    className={`form-control form-control-sm ${errors.bank && 'invalid'}`} type="text" />
                                                {
                                                    errors.bank && ErrorToast("Bank field is required !")
                                                }
                                            </div>
                                            <div className="col-4 p-2">
                                                <label className="form-label">Account Name <span style={{ color: "red" }} title='required'>*</span></label>
                                                <input
                                                    {
                                                    ...register('accountName', {
                                                        required: "accountName field is required"
                                                    })
                                                    }
                                                    className={`form-control form-control-sm ${errors.accountName && 'invalid'}`} type="text" />
                                                {
                                                    errors.accountName && ErrorToast("account Name field is required !")
                                                }
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-4 p-2">
                                                <label className="form-label">Account Number <span style={{ color: "red" }} title='required'>*</span></label>
                                                <input
                                                    {
                                                    ...register('accountNo', {
                                                        required: "Pay field is required"
                                                    })
                                                    }
                                                    className={`form-control form-control-sm ${errors.accountNo && 'invalid'}`} type="text" />
                                                {
                                                    errors.accountNo && ErrorToast("Account No is required !")
                                                }
                                            </div>
                                            <div className="col-4 p-2">
                                                <label className="form-label">Start Balance <span style={{ color: "red" }} title='required'>*</span></label>
                                                <input
                                                    {
                                                    ...register('startBalance', {
                                                        required: "Start balance field is required"
                                                    })
                                                    }
                                                    className={`form-control form-control-sm ${errors.startBalance && 'invalid'}`} type="text" />
                                                {
                                                    errors.startBalance && ErrorToast("Start Balance is required !")
                                                }
                                            </div>
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
                                                </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-12 p-2">
                                                <button className="btn btn-sm my-3 btn-success">Update</button>
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
    );
}

export default bankEdit;
