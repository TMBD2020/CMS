import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useForm } from "react-hook-form";
import { ErrorToast, SuccessToast } from "../../../helper/FormHelper";

function NoticeEdit() {
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
            const res = await fetch('http://localhost:8000/api/notice/' + params.id, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                },
            });
            const result = await res.json();
            return {
                title: result.data.title,
                description: result.data.description,
                status: result.data.status
            };
        }
    });

    useEffect(() => {
        const fetchNotice = async () => {
            const res = await fetch('http://localhost:8000/api/notice/' + params.id, {
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

    const onSubmit = async (data) => {
        try {
            const res = await fetch('http://localhost:8000/api/notice/' + params.id, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                },
                body: JSON.stringify(data),
            });

            if (!res.ok) {
                throw new Error(`Network response was not ok: ${res.statusText}`);
            }

            const result = await res.json();
            if (result.status === true) {
                SuccessToast("Notice updated successfully!");
                navigate('/notice/list');
            } else {
                ErrorToast("Notice not updated!");
            }
        } catch (error) {
            console.error('Error updating notice:', error);
        }
    };

    return (
        <div>
            <div className="container-fluid">
                <div className="row">
                    <div className="col-12">
                        <div className="card mt-1">
                            <div className="card-body">
                                <div className="row">
                                    <h5>Edit Notice</h5>
                                    <hr className="bg-light" />
                                    <form onSubmit={handleSubmit(onSubmit)}>
                                        <div className="row">
                                            {/* Notice Title */}
                                            <div className="col-4 p-2">
                                                <label className="form-label">Notice Title <span style={{ color: "red" }} title='required'>*</span></label>
                                                <input
                                                    {...register('title', { required: "Notice title is required" })}
                                                    className={`form-control form-control-sm ${errors.title && 'invalid'}`}
                                                    type="text"
                                                />
                                                {errors.title && ErrorToast("Title field is required!")}
                                            </div>

                                            {/* Status */}
                                            <div className="col-4 p-2">
                                                <label className="form-label">Status <span style={{ color: "red" }} title='required'>*</span></label>
                                                <select
                                                    {...register('status')}
                                                    className="form-control form-control-sm"
                                                >
                                                    <option value="3">Draft</option>
                                                    <option value="1">Active</option>
                                                    <option value="2">Inactive</option>
                                                </select>
                                            </div>
                                        </div>

                                        {/* Description */}
                                        <div className="row">
                                            <div className="col-8 p-2">
                                                <label className="form-label">Description</label>
                                                <textarea
                                                    {...register('description')}
                                                    className={`form-control form-control-sm ${errors.description && 'invalid'}`}
                                                    rows="4"
                                                ></textarea>
                                            </div>
                                        </div>

                                        {/* Update Button */}
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

export default NoticeEdit;
