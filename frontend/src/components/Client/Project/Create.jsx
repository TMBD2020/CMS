import React, { Fragment, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { ErrorToast, IsEmpty, SuccessToast } from "../../../helper/FormHelper";
import { apiURL } from "../../../helper/http";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { WithContext as ReactTags } from "react-tag-input";

const ProjectCreatePage = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const [company, setCompany] = useState([]);
  const [isDisable, setIsDisable] = useState(false);

  // Tags for Income Heads and Expense Heads
  const [incomeTags, setIncomeTags] = useState([]);
  const [expenseTags, setExpenseTags] = useState([]);

  const navigate = useNavigate();

  const fetchCompany = async () => {
    try {
      const res = await fetch("http://localhost:8000/api/companies", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      });

      if (!res.ok) {
        throw new Error(`Network response was not ok: ${res.statusText}`);
      }
      const result = await res.json();
      setCompany(result.data);
    } catch (error) {
      console.error("Error fetching companies:", error);
    }
  };

  useEffect(() => {
    fetchCompany();
  }, []);

  const onSubmit = async (data) => {
    const formData = new FormData();
    formData.append("companyId", data.companyId);
    formData.append("startDate", data.startDate);
    formData.append("title", data.title);
    formData.append("budget", data.budget);
    formData.append("description", data.description);
    formData.append("status", data.status);
    formData.append(
      "incomeHeads",
      incomeTags.map((tag) => tag.text).join(", ")
    );
    formData.append(
      "expenseHeads",
      expenseTags.map((tag) => tag.text).join(", ")
    );

    try {
      const res = await fetch("http://localhost:8000/api/project", {
        method: "POST",
        body: formData,
      });

      const result = await res.json();

      if (result.status === true) {
        SuccessToast("Project added successfully!");
        navigate("/project/list");
      } else {
        ErrorToast("Project not added!");
      }
    } catch (error) {
      console.error("Error submitting project:", error);
    }
  };

  const handleAddition = (tag, type) => {
    if (type === "income") {
      setIncomeTags([...incomeTags, tag]);
    } else if (type === "expense") {
      setExpenseTags([...expenseTags, tag]);
    }
  };

  const handleDelete = (index, type) => {
    if (type === "income") {
      setIncomeTags(incomeTags.filter((_, i) => i !== index));
    } else if (type === "expense") {
      setExpenseTags(expenseTags.filter((_, i) => i !== index));
    }
  };

  return (
    <Fragment>
      <div className="container-fluid">
        <div className="row">
          <div className="col-12">
            <div className="card mt-1">
              <div className="card-body">
                <div className="row">
                  <h5>Project Information</h5>
                  <hr className="bg-light" />

                  <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="row">
                      {/* Start Date */}
                      <div className="col-3 p-2">
                        <label className="form-label">
                          Start Date <span style={{ color: "red" }}>*</span>
                        </label>
                        <input
                          {...register("startDate", {
                            required: "Start Date field is required",
                          })}
                          className={`datepicker form-control form-control-sm ${
                            errors.startDate && "invalid"
                          }`}
                          type="date"
                        />
                        {errors.date && ErrorToast("Start Date field is required!")}
                      </div>

                      <div className="col-3 p-2">
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

                      {/* Project Name */}
                      <div className="col-3 p-2">
                        <label className="form-label">
                          Project Name <span style={{ color: "red" }}>*</span>
                        </label>
                        <input
                          {...register("title", {
                            required: "Project Name field is required",
                          })}
                          className="form-control form-control-sm"
                          type="text"
                        />
                        {errors.title && ErrorToast("Project Name field is required!")}
                      </div>

                      {/* Budget */}
                      <div className="col-3 p-2">
                        <label className="form-label">
                          Budget <span style={{ color: "red" }}>*</span>
                        </label>
                        <input
                          {...register("budget", {
                            required: "Budget field is required",
                          })}
                          className="form-control form-control-sm"
                          type="text"
                        />
                        {errors.budget && ErrorToast("Budget field is required!")}
                      </div>
                    </div>

                    {/* Description */}
                    <div className="row">
                      <div className="col-12 p-2">
                        <label className="form-label">
                          Description <span style={{ color: "red" }}>*</span>
                        </label>
                        <textarea
                          {...register("description", {
                            required: "Description field is required",
                          })}
                          className="form-control form-control-sm"
                          rows={4}
                        />
                        {errors.description &&
                          ErrorToast("Description field is required!")}
                      </div>
                    </div>

                    {/* Income Heads */}
                    <div className="row">
                      <div className="col-3 p-2">
                        <label className="form-label">Income Heads</label>
                        <ReactTags
                          tags={incomeTags}
                          handleDelete={(index) => handleDelete(index, "income")}
                          handleAddition={(tag) => handleAddition(tag, "income")}
                          placeholder="Add income head"
                          inputFieldPosition="inline"
                          classNames={{
                            tags: "tags-container",
                            tagInput: "tag-input",
                            tagInputField: "tag-input-field",
                            selected: "selected-tags",
                            tag: "single-tag",
                            remove: "tag-remove",
                          }}
                        />
                      </div>
                    </div>

                    {/* Expense Heads */}
                    <div className="row">
                      <div className="col-3 p-2">
                        <label className="form-label">Expense Heads</label>
                        <ReactTags
                          tags={expenseTags}
                          handleDelete={(index) => handleDelete(index, "expense")}
                          handleAddition={(tag) => handleAddition(tag, "expense")}
                          placeholder="Add expense head"
                          inputFieldPosition="inline"
                          classNames={{
                            tags: "tags-container",
                            tagInput: "tag-input",
                            tagInputField: "tag-input-field",
                            selected: "selected-tags",
                            tag: "single-tag",
                            remove: "tag-remove",
                          }}
                        />
                      </div>
                    </div>
                    <div className="row">
                    <div className="col-3 p-2">
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

                    {/* Submit Button */}
                    <div className="row">
                      <div className="col-4 p-2">
                        <button
                          disabled={isDisable}
                          className="btn btn-sm my-3 btn-success"
                        >
                          Submit
                        </button>
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

export default ProjectCreatePage;
