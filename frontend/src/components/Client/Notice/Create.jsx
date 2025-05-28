import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { ErrorToast, SuccessToast } from "../../../helper/FormHelper";

function NoticeCreate() {
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

    const onSubmit = async (data, isDraft = false) => {
        try {
            // Map the status values to integers
            const payload = {
                ...data,
                status: isDraft ? 3 : parseInt(data.status), 
            };

            const response = await fetch("http://localhost:8000/api/notices", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(payload),
            });

            const result = await response.json();

            if (response.ok && result.status === true) {
                if (isDraft) {
                    SuccessToast("Notice saved as a draft successfully!");
                } else {
                    SuccessToast("Notice added successfully!");
                }
                navigate("/notices/list");
            } else {
                ErrorToast("Failed to save the notice.");
            }
        } catch (error) {
            console.error("Error saving the notice:", error);
            ErrorToast("Something went wrong!");
        }
    };


    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-12">
                    <div className="card mt-1">
                        <div className="card-body">
                            <h5>Add Notice</h5>
                            <hr className="bg-light" />

                            {/* Form */}
                            <form>
                                <div className="row">
                                    {/* Notice Title */}
                                    <div className="col-4 p-2">
                                        <label className="form-label">
                                            Notice Title{" "}
                                            <span style={{ color: "red" }} title="required">
                                                *
                                            </span>
                                        </label>
                                        <input
                                            {...register("title", {
                                                required: "Notice title is required",
                                            })}
                                            className={`form-control form-control-sm ${errors.title ? "is-invalid" : ""
                                                }`}
                                            type="text"
                                            placeholder="Enter Notice Title"
                                            required
                                        />
                                        {errors.title && (
                                            <span className="text-danger">{errors.title.message}</span>
                                        )}
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

                                    {/* Status */}
                                    <div className="col-4 p-2">
                                        <label className="form-label">
                                            Status{" "}
                                            <span style={{ color: "red" }} title="required">
                                                *
                                            </span>
                                        </label>
                                        <select
                                            {...register("status", {
                                                required: "Status is required",
                                            })}
                                            className={`form-control form-control-sm ${errors.status ? "is-invalid" : ""
                                                }`}
                                        >
                                            <option value="1">Active</option>
                                            <option value="2">Inactive</option>
                                        </select>
                                        {errors.status && (
                                            <span className="text-danger">{errors.status.message}</span>
                                        )}
                                    </div>
                                </div>

                                <div className="row">
                                    {/* Description */}
                                    <div className="col-8 p-2">
                                        <label className="form-label">Description</label>
                                        <textarea
                                            {...register("description")}
                                            className={`form-control form-control-sm ${errors.description ? "is-invalid" : ""
                                                }`}
                                            rows="4"
                                            placeholder="Enter Notice Description"
                                        ></textarea>
                                        {errors.description && (
                                            <span className="text-danger">{errors.description.message}</span>
                                        )}
                                    </div>
                                </div>

                                {/* Buttons */}
                                <div className="row">
                                    <div className="col-12 p-2">
                                        {/* Submit Button */}
                                        <button
                                            type="button"
                                            className="btn btn-sm btn-success"
                                            onClick={handleSubmit((data) => onSubmit(data, false))} // false for Submit
                                        >
                                            Post
                                        </button>

                                        {/* Save as Draft Button */}
                                        <button
                                            type="button"
                                            className="btn btn-sm btn-warning ms-2"
                                            onClick={handleSubmit((data) => onSubmit(data, true))} // true for Draft
                                        >
                                            Save as Draft
                                        </button>
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

export default NoticeCreate;
