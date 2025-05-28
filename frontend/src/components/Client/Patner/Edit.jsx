import React, {Fragment, useEffect, useState} from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
//import {BaseURL} from '../../src/helper/config';
import { useForm } from "react-hook-form";
import {ErrorToast, IsEmpty,SuccessToast} from "../../../helper/FormHelper";
import { Nav, Tab } from "react-bootstrap";
import noImg from "../../../assets/images/No_image_available.png";


function PatnerEdit() {

    const [patner,setPatner] = useState();
    const [photoFile, setPhotoFile] = useState(null);
    const [nidPhotoFile, setNidPhotoFile] = useState(null);
    const [nPhotoFile, setNPhotoFile] = useState(null);
    const [nNidPhotoFile, setNnidPhotoFile] = useState(null);
    const [mManualFormPhotoFile, setMmanualFormPhotoFile] = useState(null);
    const params = useParams();
    const navigate = useNavigate();
    
    const { 
            register, 
            handleSubmit, 
            watch, 
            formState: { errors } 
            } = useForm({
                defaultValues: async () => {
                    const res = await fetch('http://localhost:8000/api/patner/'+params.id, {
                        method: 'GET',
                        headers: {
                            'Content-Type': 'application/json',
                            'Accept': 'application/json',
                        },
                    });
                    const result = await res.json();
                    setPatner(result.data);
                    return {
                        jDate: result.data.jDate,
                        name: result.data.name,
                        phone: result.data.phone,
                        email: result.data.email,
                        address: result.data.address,
                        nName: result.data.nName,
                        designation: result.data.designation,
                        gender: result.data.gender,
                        bGroup: result.data.bGroup,
                        mName: result.data.mName,
                        fName: result.data.fName,
                        nidNo: result.data.nidNo,
                        totalShare: result.data.totalShare,
                        relationWithNominee: result.data.relationWithNominee,
                        status: result.data.status
                    }
                }
            });

             const onSubmit = async(data) => {
                    try {
                        const res = await fetch('http://localhost:8000/api/patner/'+params.id, {
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
                        setPatner(result.data);
            
                      if(result.status == true){
                        SuccessToast("Patner information updated Successfully!")
                        navigate('/patner/list')
                      }else{
                        ErrorToast("Patner information not add!")
                      }
                    } catch (error) {
                        console.error('Error fetching Patner:', error);
                    }
                }
                const handleFile = (e) => {
                    setPhotoFile(e.target.files[0]);
                };
                
                const nidFile = (e) => {
                    setNidPhotoFile(e.target.files[0]);
                };
                
                const nomaniePhotoFile = (e) => {
                    setNPhotoFile(e.target.files[0]);
                };
                
                const nomanieNidPhotoFile = (e) => {
                    setNnidPhotoFile(e.target.files[0]);
                };
                
                const ManualFormPhotoFile = (e) => {
                    setMmanualFormPhotoFile(e.target.files[0]);
                };
                          
 
  return (
    <div>
<div className="container-fluid">
<div className="row">
<div className="col-md-4">
    <div className="card mt-1">
          <div className="card-body ">
            <div className="text-center">
                {patner?.photo ? (
                <img className="profile-user-img img-fluid rounded-circle" src={`http://localhost:8000/upload/patner/photo/${patner.photo}`} alt="User photo" />
                ) : (
                <img className="profile-user-img img-fluid rounded-circle" src={noImg} alt="No photo available" />
                )}
            </div>
            <h5 className='text-center'>{patner?.name || "N/A"}</h5>
                <ul class="list-group list-group-unbordered mb-3 mt-2">
                <li className="list-group-item from-group">
                    <b className="text-bold">Joining date</b> <a className="float-end">{patner?.jDate || "N/A"}</a>
                  </li>
                  <li className="list-group-item">
                    <b className="text-bold">Name</b> <a className="float-end">{patner?.name || "N/A"}</a>
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
                                <h5>Member Detail </h5>
                    <div className="col-12">
                        <div className="card mt-1">
                            <div className="card-body">
                                 <form onSubmit={handleSubmit(onSubmit)}>
                                                                      <div className="row">
                                                                          <div className="col-4 p-2">
                                                                              <label className="form-label">Join Date <span style={{ color: "red" }} title='required'>*</span></label>
                                                                              <input
                                                                                  {
                                                                                  ...register('jDate', {
                                                                                      required: "Join Date field is required"
                                
                                                                                  })
                                                                                  }
                                                                                  className={`datepicker form-control form-control-sm ${errors.jDate && 'invalid'}`} type="date" />
                                                                              {
                                                                                  errors.jDate && ErrorToast("Join Date field is required !")
                                                                              }
                                                                          </div>
                                                                          <div className="col-4 p-2">
                                                                              <label className="form-label">Patner Name <span style={{ color: "red" }} title='required'>*</span></label>
                                                                              <input
                                                                                  {
                                                                                  ...register('name', {
                                                                                      required: "Member name field is required"
                                
                                                                                  })
                                                                                  }
                                                                                  className="form-control form-control-sm" type="text" />
                                                                              {
                                                                                  errors.name && ErrorToast("Member name field is required !")
                                                                              }
                                                                          </div>
                                                                          <div className="col-4 p-2">
                                                                              <label className="form-label">Gender <span style={{ color: "red" }} title='required'>*</span></label>
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
                                                                              <label className="form-label">Email <span style={{ color: "red" }} title='required'>*</span></label>
                                                                              <input
                                                                                  {
                                                                                  ...register('email', {
                                                                                  })
                                                                                  }
                                                                                  className="form-control form-control-sm" type="text" />
                                                                          </div>
                                                                          <div className="col-4 p-2">
                                                                          <label className="form-label">Mobile No <span style={{ color: "red" }} title='required'>*</span></label>
                                                                              <input
                                                                                  {
                                                                                  ...register('phone', {
                                
                                                                                  })
                                                                                  }
                                                                                  className="form-control form-control-sm" type="text" />
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
                                                                                  ...register('mName', {
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
                                                                                  ...register('designation', {
                                                                                  })
                                                                                  }
                                                                                  className="form-select form-select-sm" id='exampleFormControlSelect1'>
                                                                                  <option value="" selected>Select</option>
                                                                                  <option value="director">Director</option>
                                                                                  <option value="president">President</option>
                                                                                  <option value="vice president">Vice President</option>
                                                                              </select>
                                                                          </div>
                                                                          <div className="col-4 p-2">
                                                                              <label className="form-label">Nominee name</label>
                                                                              <input
                                                                                  {
                                                                                  ...register('nName', {
                                                                                  })
                                                                                  }
                                                                                  className="form-control form-control-sm" type="text" />
                                                                          </div>
                                                                          <div className="col-4 p-2">
                                                                              <label className="form-label">Relation with nominee</label>
                                                                              <select
                                                                                  {
                                                                                  ...register('relationWithNominee', {
                                                                                  })
                                                                                  }
                                                                                  className="form-select form-select-sm" id='exampleFormControlSelect1'>
                                                                                  <option value="" selected>Select</option>
                                                                                  <option value="brother">Brother</option>
                                                                                  <option value="sister">Sister</option>
                                                                              </select>
                                                                          </div>
                                                                      </div>
                                                                      <div className="row">
                                                                          <div className="col-4 p-2">
                                                                              <label className="form-label">Total share</label>
                                                                              <input
                                                                                  {
                                                                                  ...register('totalShare', {
                                                                                  })
                                                                                  }
                                                                                  className="form-control form-control-sm" type="text" />
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
                                                                      <label className="form-label">Member Photo</label>
                                                                      <input
                                                                          onChange={handleFile}
                                                                          className="form-control form-control-md" type="file" />
                                                                      <div className="p-2">
                                                                           {patner?.photo && <img src={`http://localhost:8000/upload/patner/photo/${patner.photo}`} width={100} alt="" />}
                                                                      </div>
                                                                  </div>
                                                                  <div className="col-4 p-2">
                                                                      <label className="form-label">Member nid photo </label>
                                                                      <input
                                                                          onChange={nidFile}
                                                                          className="form-control form-control-md" type="file" />
                                                                      <div className="p-2">
                                                                      {patner?.nidPhoto && <img src={`http://localhost:8000/upload/patner/nidphoto/${patner.nidPhoto}`} width={100} alt="" />}
                                                                    
                                                                      </div>
                                                                  </div>
                                                                  <div className="col-4 p-2">
                                                                      <label className="form-label">Nominee photo</label>
                                                                      <input
                                                                          onChange={nomaniePhotoFile}
                                                                          className="form-control form-control-md" type="file" />
                                                                      <div className="p-2">
                                                                      {patner?.nPhoto && <img src={`http://localhost:8000/upload/patner/nomaniePhoto/${patner.nPhoto}`} width={100} alt="" />}
                                                                        
                                                                      </div>
                                                                  </div>
                                                              </div>

                                                              <div className="row">
                                                                  <div className="col-4 p-2">
                                                                      <label className="form-label">Nominee nid Photo</label>
                                                                      <input
                                                                          onChange={nomanieNidPhotoFile}
                                                                          className="form-control form-control-md" type="file" />
                                                                      <div className="p-2">
                                                                      {patner?.nNidPhoto && <img src={`http://localhost:8000/upload/patner/nomanieNidPhoto/${patner.nNidPhoto}`} width={100} alt="" />}
                                                                         
                                                                      </div>
                                                                  </div>
                                                                  <div className="col-4 p-2">
                                                                      <label className="form-label">Member manual form photo</label>
                                                                      <input
                                                                          onChange={ManualFormPhotoFile}
                                                                          className="form-control form-control-md" type="file" />
                                                                      <div className="p-2">
                                                                      {patner?.mManualFormPhoto && <img src={`http://localhost:8000/upload/patner/mManualFormPhoto/${patner.mManualFormPhoto}`} width={100} alt="" />}
                                                                      </div>
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
                                                                              <button className="btn btn-sm my-3 btn-success">Submit</button>
                                                                          </div>
                                                                      </div>
                                                                  </form>     
                                                      </div>
                                                  </div>
                                              </div>

                                          </div>
                                      </Tab.Pane>
                                      <Tab.Pane eventKey="loginfo">
                                          <div className="row mt-3">
                                              <h5 >Login information</h5>
                                              <hr className="bg-light" />
                                              <div className="col-6 p-2">
                                                  <label className="form-label">Role</label>
                                                  <select className="form-select form-select-sm" id='exampleFormControlSelect1'>
                                                      <option selected>Select</option>
                                                      <option value="1">Admin</option>
                                                  </select>

                                              </div>
                                              <div className="col-6 p-2">
                                                  <label className="form-label">Login Email </label>
                                                  <input className="form-control form-control-sm" type="text" />
                                              </div>
                                              <div className="col-6 p-2">
                                                  <label className="form-label">Login Phone </label>
                                                  <input className="form-control form-control-sm" type="text" />
                                              </div>

                                              <div className="col-6 p-2">
                                                  <label className="form-label">New Password </label>
                                                  <input className="form-control form-control-sm" type="text" />
                                              </div>
                                              <div className="col-6 p-2">
                                                  <label className="form-label">Confirm Password </label>
                                                  <input className="form-control form-control-sm" type="text" />
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
      </div>
  )
}

export default PatnerEdit
