import React, {Fragment, useEffect, useState} from 'react';
import {useSelector} from "react-redux";
// import store from "../../redux/store/store";
// import {OnChangeCustomerInput} from "../../redux/state-slice/customer-slice";
// import {CreateCustomerRequest, FillCustomerFormRequest} from "../../APIRequest/CustomerAPIRequest";
import {ErrorToast, IsEmpty,SuccessToast} from "../../../helper/FormHelper";
import {apiURL} from '../../../helper/http'
import { useForm } from "react-hook-form";
import {useNavigate, useParams} from "react-router-dom";
import { Nav, Tab } from "react-bootstrap";


const MemberEditPage = () => {

    
    const [isDisable, setIsDisable] = useState(false);
    const [company,setCompany] = useState('');
    const [member,setMember] = useState('');
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
                const res = await fetch('http://localhost:8000/api/member/'+params.id, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json',
                    },
                });
                const result = await res.json();
                setMember(result.data);
                return {
                    companyId: result.data.companyId,
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

    // const onSubmit = async(data) => {
    //     const newData = {...data,
    //         "photoFile" : photoFile,
    //         "nidPhotoFile" : nidPhotoFile,
    //         "nPhotoFile" : nPhotoFile ,
    //         "nNidPhotoFile" : nNidPhotoFile,
    //         "mManualFormPhotoFile" : mManualFormPhotoFile
    //     }
    //     try {
    //         const res = await fetch('http://localhost:8000/api/member/'+params.id, {
    //             method: 'PUT',
    //             headers: {
    //                 'Content-Type': 'application/json',
    //                 'Accept': 'application/json',
    //             },
    //             body:JSON.stringify(newData)
    //         });
    //         const result = await res.json();

    //       if(result.status == true){
    //         SuccessToast("Member Data Updated Successfully!")
    //         navigate('/member/list')
    //       }else{
    //         ErrorToast("Member data not updated!")
    //       }
    //     } catch (error) {
    //         console.error('Error fetching member:', error);
    //     }
    // }

    const onSubmit = async (data) => {
        const formData = new FormData();
        formData.append('companyId', data.companyId);
        formData.append('jDate', data.jDate);
        formData.append('name', data.name);
        formData.append('email', data.email);
        formData.append('phone', data.phone);
        formData.append('address', data.address);
        formData.append('nName', data.nName);
        formData.append('designation', data.designation);
        formData.append('gender', data.gender);
        formData.append('bGroup', data.bGroup);
        formData.append('mName', data.mName);
        formData.append('fName', data.fName);
        formData.append('nidNo', data.nidNo);
        formData.append('totalShare', data.totalShare);
        formData.append('relationWithNominee', data.relationWithNominee);
        formData.append('status', data.status);
        if (photoFile) formData.append('photo', photoFile);
        if (nidPhotoFile) formData.append('nidPhoto', nidPhotoFile);
        if (nPhotoFile) formData.append('nPhoto', nPhotoFile);
        if (nNidPhotoFile) formData.append('nNidPhoto', nNidPhotoFile);
        if (mManualFormPhotoFile) formData.append('mManualFormPhoto', mManualFormPhotoFile);
    
        try {
            const res = await fetch('http://localhost:8000/api/member/'+params.id, {
                method: 'PUT',
                headers: {
                    'Accept': 'application/json',
                },
                body: formData
            });
            const result = await res.json();
    
            if (result.status === true) {
                SuccessToast("Member Data Updated Successfully!");
                navigate('/member/list');
            } else {
                ErrorToast("Member data not updated!");
            }
        } catch (error) {
            console.error('Error updating member:', error);
        }
    };
    
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
        <Fragment>
            <div className="container-fluid">
                <div className="row">
                    <div className="col-md-4">

                    <div className="card mt-1">
          <div className="card-body ">
            <div className="text-center">
             <img className="profile-user-img  img-fluid rounded-circle" src={'http://localhost:8000/upload/member/photo/' + member.photo} alt="User photo" />
            </div>
            <h5 className='text-center'>{member?.name || "N/A"}</h5>
                <ul class="list-group list-group-unbordered mb-3 mt-2">
                <li className="list-group-item from-group">
                    <b className="text-bold">Joining date</b> <a className="float-end">{member?.jDate || "N/A"}</a>
                  </li>
                  <li className="list-group-item">
                    <b className="text-bold">Name</b> <a className="float-end">{member?.name || "N/A"}</a>
                  </li>
                  <li className="list-group-item">
                    <b className="text-bold">Designation</b> <a className="float-end">{member?.designation || "N/A"}</a>
                  </li>
                  <li className="list-group-item">
                    <b className="text-bold">TotalShare</b> <a className="float-end">{member?.totalShare || "N/A"}</a>
                  </li>
                  <li className="list-group-item">
                  <b className="text-bold">Status</b> <a className="float-end"><span className={`badge ${member?.status === 1 ? "bg-pannel" : "bg-danger"}`}>{member?.status === 1 ? "Active" : "Inactive"}</span></a>
                  </li>
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
                                    <hr className="bg-light"/>
                                    <form onSubmit={handleSubmit(onSubmit)}>
                                        <div className="row">
                                            <div className="col-4 p-2">
                                                <label className="form-label">Join Date <span style={{ color: "red" }} title='required'>*</span></label>
                                                <input
                                                    {
                                                    ...register('jDate', {
                                                    })
                                                    }
                                                    className={`datepicker form-control form-control-sm ${errors.jDate && 'invalid'}`} type="date" />
                                               
                                            </div>
                                            <div className="col-4 p-2">
                                                <label className="form-label">Member Name <span style={{ color: "red" }} title='required'>*</span></label>
                                                <input
                                                    {
                                                    ...register('name', {
                                                     

                                                    })
                                                    }
                                                    className="form-control form-control-sm" type="text" />
                                               
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
                                                <label className="form-label">Company <span style={{ color: "red" }} title='required'>*</span></label>
                                                <select
                                                    {
                                                    ...register('companyId', {
                                                       
                                                    })
                                                    }
                                                    className="form-select form-select-sm" id='exampleFormControlSelect1'>
                                                    <option value="" selected>Select</option>
                                                    {company && company.map(companyData => (
                                                        <option key={companyData.id} value={companyData.id}>{companyData.name}</option>
                                                    ))}
                                                </select>
                                               
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
                                                    {
                                                        member.photo && <img src={'http://localhost:8000/upload/member/photo/' + member.photo} width={100} alt="" />
                                                    }
                                                </div>
                                            </div>
                                            <div className="col-4 p-2">
                                                <label className="form-label">Member nid photo </label>
                                                <input
                                                    onChange={nidFile}
                                                    className="form-control form-control-md" type="file" />
                                                <div className="p-2">
                                                    {
                                                        member.nidPhoto && <img src={'http://localhost:8000/upload/member/nidphoto/' + member.nidPhoto} width={100} alt="" />
                                                    }
                                                </div>
                                            </div>
                                            <div className="col-4 p-2">
                                                <label className="form-label">Nominee photo</label>
                                                <input
                                                    onChange={nomaniePhotoFile}
                                                    className="form-control form-control-md" type="file" />
                                                 <div className="p-2">
                                                    {
                                                        member.nPhoto && <img src={'http://localhost:8000/upload/member/nomaniePhoto/' + member.nPhoto} width={100} alt="" />
                                                    }
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
                                                    {
                                                        member.nNidPhoto && <img src={'http://localhost:8000/upload/member/nomaniePhoto/' + member.nNidPhoto} width={100} alt="" />
                                                    }
                                                </div>    
                                            </div>
                                            <div className="col-4 p-2">
                                                <label className="form-label">Member manual form photo</label>
                                                <input
                                                    onChange={ManualFormPhotoFile}
                                                    className="form-control form-control-md" type="file" />
                                                 <div className="p-2">
                                                    {
                                                        member.mManualFormPhoto && <img src={'http://localhost:8000/upload/member/mManualFormPhoto/' + member.mManualFormPhoto} width={100} alt="" />
                                                    }
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
                                                <button disabled={isDisable} className="btn btn-sm my-3 btn-success">Submit</button>
                                            </div>
                                        </div>
                                    </form>
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
        </Fragment>
    );
};

export default MemberEditPage;