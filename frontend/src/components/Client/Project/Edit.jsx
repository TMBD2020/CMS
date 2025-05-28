import React, { Fragment, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { ErrorToast, IsEmpty, SuccessToast } from "../../../helper/FormHelper";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { WithContext as ReactTags } from "react-tag-input";
import { Nav, Tab } from "react-bootstrap";
const ProjectEdit = () => {
  const [project, setProject] = useState();
  const [company, setCompany] = useState([]);
  const [incomeTags, setIncomeTags] = useState([]);
  const [expenseTags, setExpenseTags] = useState([]);
  const [isDisable, setIsDisable] = useState(false);
  const params = useParams();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  // Fetch project details
  useEffect(() => {
    const fetchProject = async () => {
      try {
        const res = await fetch(`http://localhost:8000/api/project/${params.id}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            'Accept': "application/json",
          },
        });

        if (!res.ok) {
          throw new Error(`Network response was not ok: ${res.statusText}`);
        }

        const result = await res.json();

        if (result.status) {
          const projectData = result.data;

          // Set project data for form fields
          setProject(projectData);

          // Populate incomeTags and expenseTags
          setIncomeTags(
            projectData.incomeHeads
              ? projectData.incomeHeads.split(",").map((head, index) => ({
                  id: `${index}`,
                  text: head.trim(),
                }))
              : []
          );

          setExpenseTags(
            projectData.expenseHeads
              ? projectData.expenseHeads.split(",").map((head, index) => ({
                  id: `${index}`,
                  text: head.trim(),
                }))
              : []
          );
        }
      } catch (error) {
        console.error("Error fetching project details:", error);
      }
    };

    fetchProject();
  }, [params.id]);


  // Form submission handler
  const onSubmit = async (data) => {
    const updatedData = {
      ...data,
      incomeHeads: incomeTags.map((tag) => tag.text).join(", "),
      expenseHeads: expenseTags.map((tag) => tag.text).join(", "),
    };

    try {
      const res = await fetch(`http://localhost:8000/api/project/${params.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          'Accept': "application/json",
        },
        body: JSON.stringify(updatedData),
      });

      const result = await res.json();

      if (result.status) {
        SuccessToast("Project Updated Successfully!");
        navigate("/project/list");
      } else {
        ErrorToast("Project not updated!");
      }
    } catch (error) {
      console.error("Error updating project:", error);
    }
  };

  // Tag handlers
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
          <div className="col-md-4">
          <div className="card mt-1">
          <div className="card-body ">
                <ul class="list-group list-group-unbordered mb-3 mt-2">
                <li className="list-group-item from-group">
                    <b className="text-bold">Start date</b> <a className="float-end">{project?.startDate || "N/A"}</a>
                  </li>
                  <li className="list-group-item">
                    <b className="text-bold">Project name</b> <a className="float-end">{project?.title || "N/A"}</a>
                  </li>
                  <li className="list-group-item">
                    <b className="text-bold">Budget</b> <a className="float-end">{project?.budget || "N/A"}</a>
                  </li>
                  <li className="list-group-item">
                  <b className="text-bold">Status</b> <a className="float-end"><span className={`badge ${project?.status === 1 ? "bg-pannel" : "bg-danger"}`}>{project?.status === 1 ? "Active" : "Inactive"}</span></a>
                  </li>
                </ul>

            </div>
            </div>
          </div>
      <div className="col-md-8">
      <div className="row">
          <div className="col-12">
            <div className="card mt-1">
              <div className="card-body">
                {/* <h5>Detail Project</h5>
                <hr className="bg-light" />
                <form onSubmit={handleSubmit(onSubmit)}>
                  <div className="row">
                    <div className="col-3 p-2">
                      <label className="form-label">Start Date </label>
                      <input
                        {...register("startDate")}
                        className="form-control form-control-sm"
                        type="date"
                        defaultValue={project?.startDate || ""}
                      />
                    </div>
                    <div className="col-3 p-2">
                      <label className="form-label">Project Name </label>
                      <input
                        {...register("title")}
                        className="form-control form-control-sm"
                        type="text"
                        defaultValue={project?.title || ""}
                      />
              
                    </div>

                    <div className="col-3 p-2">
                      <label className="form-label">Budget *</label>
                      <input
                        {...register("budget")}
                        className="form-control form-control-sm"
                        type="text"
                        defaultValue={project?.budget || ""}
                      />
                    
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-12 p-2">
                      <label className="form-label">Description *</label>
                      <textarea
                        {...register("description")}
                        className="form-control form-control-sm"
                        rows={4}
                        defaultValue={project?.description || ""}
                      />
                     
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-9 p-2">
                      <label className="form-label">Income Heads</label>
                      <ReactTags
                        tags={incomeTags}
                        handleDelete={(index) => handleDelete(index, "income")}
                        handleAddition={(tag) => handleAddition(tag, "income")}
                        placeholder="income head"
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
                    <div className="col-9 p-2">
                      <label className="form-label">Expense Heads</label>
                      <ReactTags
                        tags={expenseTags}
                        handleDelete={(index) => handleDelete(index, "expense")}
                        handleAddition={(tag) => handleAddition(tag, "expense")}
                        placeholder="expense head"
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
                      <label className="form-label">Status *</label>
                      <select
                        {...register("status")}
                        className="form-select form-select-sm"
                        value={project?.status || ""}
                      >
                        <option value="" disabled>
                          Select Status
                        </option>
                        <option value="1">Active</option>
                        <option value="2">Inactive</option>
                      </select>
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-4 p-2">
                      <button
                        className="btn btn-sm my-3 btn-success"
                      >
                        Update
                      </button>
                    </div>
                  </div>
                </form> */}
                <Tab.Container defaultActiveKey="details">
              <Nav variant="tabs">
                <Nav.Item>
                  <Nav.Link eventKey="details" className="tabText">Details</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey="revenues" className="tabText">Revenues</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey="expense" className="tabText">Expense</Nav.Link>
                </Nav.Item>
              </Nav>
              <Tab.Content>
                <Tab.Pane eventKey="details">
                  <div className="card mt-1">
                    <div className="card-body">
                      <h5>Detail Project</h5>
                      <hr className="bg-light" />

                      <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="row">
                          <div className="col-3 p-2">
                            <label className="form-label">Start Date </label>
                            <input
                              {...register("startDate")}
                              className="form-control form-control-sm"
                              type="date"
                              defaultValue={project?.startDate || ""}
                            />
                          </div>
                          <div className="col-3 p-2">
                            <label className="form-label">Project Name </label>
                            <input
                              {...register("title")}
                              className="form-control form-control-sm"
                              type="text"
                              defaultValue={project?.title || ""}
                            />
                          </div>

                          <div className="col-3 p-2">
                            <label className="form-label">Budget *</label>
                            <input
                              {...register("budget")}
                              className="form-control form-control-sm"
                              type="text"
                              defaultValue={project?.budget || ""}
                            />
                          </div>
                        </div>
                        <div className="row">
                    <div className="col-9 p-2">
                      <label className="form-label">Income Heads</label>
                      <ReactTags
                        tags={incomeTags}
                        handleDelete={(index) => handleDelete(index, "income")}
                        handleAddition={(tag) => handleAddition(tag, "income")}
                        placeholder="income head"
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
                    <div className="col-9 p-2">
                      <label className="form-label">Expense Heads</label>
                      <ReactTags
                        tags={expenseTags}
                        handleDelete={(index) => handleDelete(index, "expense")}
                        handleAddition={(tag) => handleAddition(tag, "expense")}
                        placeholder="expense head"
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
                          <div className="col-12 p-2">
                            <label className="form-label">Description *</label>
                            <textarea
                              {...register("description")}
                              className="form-control form-control-sm"
                              rows={4}
                              defaultValue={project?.description || ""}
                            />
                          </div>
                        </div>

                                <div className="row">
                                  <div className="col-3 p-2">
                                    <label className="form-label">Status *</label>
                                    <select
                                      {...register("status")}
                                      className="form-select form-select-sm"
                                      value={project?.status || ""}
                                    >
                                      <option value="" disabled>
                                        Select Status
                                      </option>
                                      <option value="1">Active</option>
                                      <option value="2">Inactive</option>
                                    </select>
                                  </div>
                                </div>

                        <div className="row">
                          <div className="col-4 p-2">
                            <button
                              className="btn btn-sm my-3 btn-success"
                            >
                              Update
                            </button>
                          </div>
                        </div>
                      </form>
                    </div>
                  </div>
                </Tab.Pane>
                <Tab.Pane eventKey="revenues">
                  <div className="card mt-1">
                    <div className="card-body">
                      <h5>Revenues</h5>
                      <hr className="bg-light" />
                      <div className="row">
                        <div className="col-9 p-2">
                          <ReactTags
                            tags={incomeTags}
                            handleDelete={(index) => handleDelete(index, "income")}
                            handleAddition={(tag) => handleAddition(tag, "income")}
                            placeholder="income head"
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
                    </div>
                  </div>
                </Tab.Pane>
                <Tab.Pane eventKey="expense">
                  <div className="card mt-1">
                    <div className="card-body">
                      <h5>Expense</h5>
                      <hr className="bg-light" />
                      <div className="row">
                        <div className="col-9 p-2">
                          <ReactTags
                            tags={expenseTags}
                            handleDelete={(index) => handleDelete(index, "expense")}
                            handleAddition={(tag) => handleAddition(tag, "expense")}
                            placeholder="expense head"
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
                    </div>
                  </div>
                </Tab.Pane>
              </Tab.Content>
            </Tab.Container>
              </div>
            </div>
          </div>
        </div>
      </div>
     
        </div>{/* end-row */}
      </div> {/* end-container */}
    </Fragment>
  );
};

export default ProjectEdit;
