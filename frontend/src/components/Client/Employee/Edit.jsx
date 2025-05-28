import React, {Fragment, useEffect, useState} from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
//import {BaseURL} from '../../src/helper/config';
import { useForm } from "react-hook-form";
import {ErrorToast, IsEmpty,SuccessToast} from "../../../helper/FormHelper";
import { Nav, Tab } from "react-bootstrap";
import noImg from "../../../assets/images/No_image_available.png";


function EmployeeEdit() {
    useEffect(() => {
        document.title = "CMS :: Employee Details";
    }, []);
    const params = useParams();
    const [photoFile, setPhotoFile] = useState(null);
    const [nidPhotoFile, setNidPhotoFile] = useState(null);
    const [designation,setDesignation] = useState();
    const [employee,setEmployee] = useState(null);
    const [isDisable, setIsDisable] = useState(false);
    
    const fetchDesignation = async () => {
        try {
            const res = await fetch('http://localhost:8000/api/designation', {
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
            setDesignation(result.data);
        } catch (error) {
            console.error('Error fetching designation:', error);
        } 
    }
    
    useEffect(() => {
        fetchDesignation();
    }, []);

  const { 
          register, 
          handleSubmit, 
          watch, 
          formState: { errors } 
          } = useForm({
              defaultValues: async () => {
                  const res = await fetch('http://localhost:8000/api/employees/'+params.id, {
                      method: 'GET',
                      headers: {
                          'Content-Type': 'application/json',
                          'Accept': 'application/json',
                      },
                  });
                  const result = await res.json();
                  setEmployee(result.data);
                  return {
                    jDate: result.data.jDate,
                    name: result.data.name,
                    email: result.data.email,
                    phone: result.data.phone,
                    address: result.data.address,
                    bGroup: result.data.bGroup,
                    gender: result.data.gender,
                    fName: result.data.fName,
                    lName: result.data.lName,
                    nidNo: result.data.nidNo,
                    designation_id: result.data.designation_id,
                    salary: result.data.salary,
                    status: result.data.status,
                  }
              }
          });

       const navigate = useNavigate();

    const onSubmit = async(data) => {
        try {
            const res = await fetch('http://localhost:8000/api/employees/'+params.id, {
                method: 'PUT',
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
            setEmployee(result.data);

          if(result.status == true){
            SuccessToast("Employee information updated Successfully!")
            navigate('/employee/list')
          }else{
            ErrorToast("Employee information not add!")
          }
        } catch (error) {
            console.error('Error fetching Employee:', error);
        }
    }
    // const onSubmit = async (data) => {
    //     const formData = new FormData();
    //     formData.append('companyId', data.companyId);
    //     formData.append('jDate', data.jDate);
    //     formData.append('name', data.name);
    //     formData.append('email', data.email);
    //     formData.append('phone', data.phone);
    //     formData.append('address', data.address);
    //     formData.append('bGroup', data.bGroup);
    //     formData.append('gender', data.gender);
    //     formData.append('fName', data.fName);
    //     formData.append('lName', data.lName);
    //     formData.append('nidNo', data.nidNo);
    //     formData.append('designation_id', data.designation_id);
    //     formData.append('salary', data.salary);
    //     formData.append('status', data.status);
    //     if (photoFile) {
    //         formData.append('photo', photoFile);
    //     }
    //     if (nidPhotoFile) {
    //         formData.append('nidPhoto', nidPhotoFile);
    //     }

    //     try {
    //         const res = await fetch('http://localhost:8000/api/employees/' + params.id, {
    //             method: 'PUT',
    //             headers: {
    //                 'Accept': 'application/json',
    //             },
    //             body: formData
    //         });

    //         if (!res.ok) {
    //             throw new Error(`Network response was not ok: ${res.statusText}`);
    //         }

    //         const result = await res.json();
    //         if (result.status === true) {
    //             SuccessToast("Employee information updated successfully!");
    //             navigate('/employee/list');
    //         } else {
    //             ErrorToast("Employee information not updated!");
    //         }
    //     } catch (error) {
    //         console.error('Error updating employee:', error);
    //     }
    // };

    const handleFile = (e) => {
        setPhotoFile(e.target.files[0]);
    };

    const nidFile = (e) => {
        setNidPhotoFile(e.target.files[0]);
    };

  return (
    <>
   <div className="container-fluid">
   <div className="row">
                    <div className="col-md-4">

                    <div className="card mt-1">
          <div className="card-body ">
            <div className="text-center">
            {employee?.photo ? (
             <img className="profile-user-img img-fluid rounded-circle" src={`http://localhost:8000/upload/employee/photo/${employee.photo}`} alt="User photo" />
                ) : (
                <img className="profile-user-img img-fluid rounded-circle" src={noImg} alt="No photo available" />
                )}
            {/* <img className="profile-user-img img-fluid rounded-circle" src={`http://localhost:8000/upload/employee/photo/${employee?.photo}`} alt="User photo" /> */}
            </div>
           
            <h5 className='text-center mt-2'>{employee?.name || "N/A"}</h5>
                <ul class="list-group list-group-unbordered mb-3 mt-2">
                <li className="list-group-item from-group">
                    <b className="text-bold">Joining date</b> <a className="float-end">{employee?.jDate || "N/A"}</a>
                  </li>
                  <li className="list-group-item">
                    <b className="text-bold">Name</b> <a className="float-end">{employee?.name || "N/A"}</a>
                  </li>
                  {/* <li className="list-group-item">
                    <b className="text-bold">Budget</b> <a className="float-end">{project?.budget || "N/A"}</a>
                  </li>
                  <li className="list-group-item">
                    <b className="text-bold">Description</b> <a className="float-end">{project?.description || "N/A"}</a>
                  </li>
                  <li className="list-group-item">
                  <b className="text-bold">Status</b> <a className="float-end"><span className={`badge ${project?.status === 1 ? "bg-pannel" : "bg-danger"}`}>{project?.status === 1 ? "Active" : "Inactive"}</span></a>
                  </li> */}
                </ul>

            </div>
                   </div>
                    </div>
                <div className="col-md-8">
                  
                        <div className="card mt-1">
                            <div className="card-body">
                                  <Tab.Container defaultActiveKey="details">
                                     <Nav variant="tabs">
                                       <Nav.Item>
                                         <Nav.Link eventKey="details" className="tabText">Details</Nav.Link>
                                            </Nav.Item>
                                                <Nav.Item>
                                                    <Nav.Link eventKey="loginfo" className="tabText">Login info</Nav.Link>
                                                </Nav.Item>
                                            <Nav.Item>
                                        </Nav.Item>
                                    </Nav>
                                     <Tab.Content>
                                <Tab.Pane eventKey="details">
                                <div className="row mt-3">
                    <div className="col-12">
                        <div className="card mt-1">
                            <div className="card-body">
                                <div className="row">
                                    <h5>Employee Detail</h5>
                                    <hr className="bg-light"/>
                                  <form onSubmit={handleSubmit(onSubmit)}>
                                      <div className="row">
                                          <div className="col-4 p-2">
                                              <label className="form-label">Join Date</label>
                                              <input
                                                  {
                                                  ...register('jDate', {
                                                  })
                                                  }
                                                  className={`datepicker form-control form-control-sm`} type="date" />
                                          </div>
                                          <div className="col-4 p-2">
                                              <label className="form-label">Employee Name </label>
                                              <input
                                                  {
                                                  ...register('name', {
                                                  })
                                                  }
                                                  className="form-control form-control-sm" type="text" />
                                          </div>
                                          <div className="col-4 p-2">
                                              <label className="form-label">Gender</label>
                                              <select
                                                  {
                                                  ...register('gender', {
                                                  })
                                                  }
                                                  className="form-select form-select-sm" id='exampleFormControlSelect1'>
                                                  <option value="" selected>Select</option>
                                                  <option value="men">Men</option>
                                                  <option value="women">Women</option>
                                                  <option value="other">Other</option>
                                              </select>
                                          </div>
                                      </div>

                                      <div className="row">
                                          <div className="col-4 p-2">
                                              <label className="form-label">Email</label>
                                              <input
                                                  {
                                                  ...register('email', {
                                                  })
                                                  }
                                                  className="form-control form-control-sm" type="text" />
                                          </div>
                                          <div className="col-4 p-2">
                                          <label className="form-label">Salary</label>
                                              <input
                                                  {
                                                  ...register('salary', {
                                                  })
                                                  }
                                                  className="form-control form-control-sm" type="text" />
                                          </div>
                                          <div className="col-4 p-2">
                                              <label className="form-label">Mobile No</label>
                                              <input
                                                  {
                                                  ...register('phone')
                                                  }
                                                  className="form-control form-control-sm" type="text" />

                                          </div>
                                      </div>
                                      <div className="row">
                                          <div className="col-4 p-2">
                                              <label className="form-label">Father Name</label>
                                              <input
                                                  {
                                                  ...register('fName', {
                                                  })
                                                  }
                                                  className="form-control form-control-sm" type="text" />
                                          </div>
                                          <div className="col-4 p-2">
                                              <label className="form-label">Mother Name</label>
                                              <input
                                                  {
                                                  ...register('lName', {
                                                  })
                                                  }
                                                  className="form-control form-control-sm" type="text" />
                                          </div>
                                          <div className="col-4 p-2">
                                              <label className="form-label">Nid no</label>
                                              <input
                                                  {
                                                  ...register('nidNo', {
                                                  })
                                                  }
                                                  className="form-control form-control-sm" type="number" />
                                          </div>
                                      </div>
                                      <div className="row">
                                          <div className="col-4 p-2">
                                              <label className="form-label">Designation <span style={{ color: "red" }} title='required'>*</span></label>
                                              <select
                                                  {
                                                  ...register('designation_id', {
                                                  })
                                                  }
                                                  className="form-select form-select-sm" id='exampleFormControlSelect1'>
                                                  <option value="" selected>Select</option>
                                                  {designation && designation.map(designationData => (
                                                      <option key={designationData.id} value={designationData.id}>{designationData.name}</option>
                                                  ))}
                                              </select>
                                          </div>
                                          <div className="col-4 p-2">
                                              <label className="form-label">Blood group</label>
                                              <input
                                                  {
                                                  ...register('bGroup', {
                                                  })
                                                  }
                                                  className="form-control form-control-sm" type="text" />
                                          </div>
                                          <div className="col-4 p-2">
                                              
                                          </div>
                                      </div>
                                      <div className="row">
                                          <div className="col-12 p-2">
                                              <label className="form-label">Address <span style={{ color: "red" }} title='required'>*</span></label>
                                              <textarea
                                                  {
                                                  ...register('address', {
                                                  })
                                                  }
                                                  className="form-control form-control-sm" rows={4} />
                                          </div>
                                      </div>
                                      <div className="row">
                                          <div className="col-4 p-2">
                                              <label className="form-label">Employee Photo</label>
                                              <input
                                                  onChange={handleFile}
                                                  className="form-control form-control-md" type="file" />
                                              <br />
                                              {/* {
                                                  employee.photo && <img src={'http://localhost:8000/upload/employee/photo/' + employee.photo} width={100} alt="" />
                                              } */}
                                        {employee?.photo && <img src={`http://localhost:8000/upload/employee/photo/${employee.photo}`} width={100} alt="" />}

                                          </div>
                                          <div className="col-4 p-2">
                                              <label className="form-label">Employee nid photo </label>
                                              <input
                                                  onChange={nidFile}
                                                  className="form-control form-control-md" type="file" />
                                              <br />
                                              {employee?.nidPhoto && <img src={`http://localhost:8000/upload/employee/nidphoto/${employee.nidPhoto}`} width={100} alt="" />}
                                              {/* {
                                                  employee.nidPhoto && <img src={'http://localhost:8000/upload/employee/nidphoto/' + employee.nidPhoto} width={100} alt="" />
                                              } */}
                                          </div>

                                      </div>


                                      <div className="row">
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
                                              {
                                                  errors.status && ErrorToast("Status field is required !")
                                              }
                                          </div>
                                      </div>
                                      <div className="row">
                                          <div className="col-4 p-2">
                                              <button disabled={isDisable} className="btn btn-sm my-3 btn-success">Submit</button>
                                          </div>
                                      </div>
                                  </form>
                                </div>
                            </div>
                        </div>
                    </div>
                   
                </div>
                        </Tab.Pane>
                        <Tab.Pane eventKey="loginfo">
                          <div className="row mt-3">
                                    <h5 >Login information</h5>
                                    <hr className="bg-light"/>
                                    <div className="col-6 p-2">
                                        <label className="form-label">Role</label>
                                        <select className="form-select form-select-sm" id='exampleFormControlSelect1'>
                                           <option selected>Select</option>
                                            <option value="1">Admin</option>
                                         </select>
                                      
                                    </div>
                                    <div className="col-6 p-2">
                                        <label className="form-label">Login Email </label>
                                        <input className="form-control form-control-sm" type="text"/>
                                    </div>
                                    <div className="col-6 p-2">
                                        <label className="form-label">Login Phone </label>
                                        <input className="form-control form-control-sm" type="text"/>
                                    </div>
                                   
                                    <div className="col-6 p-2">
                                        <label className="form-label">New Password </label>
                                        <input  className="form-control form-control-sm" type="text"/>
                                    </div>
                                    <div className="col-6 p-2">
                                        <label className="form-label">Confirm Password </label>
                                        <input className="form-control form-control-sm" type="text"/>
                                    </div>
                                    <div className="row">
                                            <div className="col-4 p-2">
                                                <button className="btn btn-sm my-3 btn-success">Submit</button>
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
    </>
  )
}

export default EmployeeEdit
