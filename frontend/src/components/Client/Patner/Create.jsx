import React, {Fragment, useEffect, useState} from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
//import {BaseURL} from '../../src/helper/config';
import { useForm } from "react-hook-form";
import {ErrorToast, IsEmpty,SuccessToast} from "../../../helper/FormHelper";


function PatnerCreate() {

    useEffect(() => {
        document.title = "CMS :: Patner create";
    }, []);
    const [company,setCompany] = useState();
    const [isDisable,setIsDisable] = useState(false);
    const [photoFile, setPhotoFile] = useState(null);
    const [nidPhotoFile, setNidPhotoFile] = useState(null);
    const [nPhotoFile, setNPhotoFile] = useState(null);
    const [nNidPhotoFile, setNnidPhotoFile] = useState(null);
    const [mManualFormPhotoFile, setMmanualFormPhotoFile] = useState(null);
      // State for image previews
    const [photoPreview, setPhotoPreview] = useState(null);
    const [nidPhotoPreview, setNidPhotoPreview] = useState(null);
    const [nPhotoPreview, setNPhotoPreview] = useState(null);
    const [nNidPhotoPreview, setNNidPhotoPreview] = useState(null);
    const [manualFormPreview, setManualFormPreview] = useState(null);

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

    const { 
        register, 
        handleSubmit, 
        watch, 
        formState: { errors } 
        } = useForm();

       const navigate = useNavigate();

    // const onSubmit = async(data) => {
    //     try {
    //         const res = await fetch('http://localhost:8000/api/patner', {
    //             method: 'POST',
    //             headers: {
    //                 'Content-Type': 'application/json',
    //                 'Accept': 'application/json',
    //             },
    //             body:JSON.stringify(data)
    //         });

    //         if (!res.ok) {
    //             throw new Error(`Network response was not ok: ${res.statusText}`);
    //         }

    //         const result = await res.json();
    //       if(result.status == true){
    //         SuccessToast("Patner addedd Successfully!")
    //         navigate('/patner/list')
    //       }else{
    //         ErrorToast("patner not add!")
    //       }
    //     } catch (error) {
    //         console.error('Error fetching patner:', error);
    //     }
    // }

       const onSubmit = async(data) => {
            const formData = new FormData();
            formData.append('companyId', data.companyId);
            formData.append('jDate', data.jDate);
            formData.append('name', data.name);
            formData.append('email', data.email);
            formData.append('phone', data.phone);
            formData.append('address', data.address);
            formData.append('nName', data.nName);
            formData.append('designation', data.startingBalance);
            formData.append('gender', data.gender);
            formData.append('bGroup', data.bGroup);
            formData.append('mName', data.mName);
            formData.append('fName', data.fName);
            formData.append('nidNo', data.nidNo);
            formData.append('totalShare', data.totalShare);
            formData.append('relationWithNominee', data.relationWithNominee);
            formData.append('status', data.status);
            if (photoFile) {
                formData.append('photo', photoFile); 
            }
            if (nidPhotoFile) {
                formData.append('nidPhoto', nidPhotoFile);
            }
            if (nPhotoFile) {
                formData.append('nPhoto', nPhotoFile);
            }
            if (nNidPhotoFile) {
                formData.append('nNidPhoto', nNidPhotoFile);
            }
            if (mManualFormPhotoFile) {
                formData.append('mManualFormPhoto', mManualFormPhotoFile);
            }
    
            try {
                const res = await fetch('http://localhost:8000/api/patner', {
                    method: 'POST',
                    body: formData, // Sending FormData instead of JSON string
                });
        
                const result = await res.json();
    
                if(result.status == true){
                SuccessToast("Patner addedd Successfully!")
                navigate('/patner/list')
                }else{
                    ErrorToast("patner not add!")
                        }
                } catch (error) {
                 console.error('Error fetching patner:', error);
                }
        }


    const handleFile = (e) => {
        const file = e.target.files[0];
        setPhotoFile(file);
        setPhotoPreview(URL.createObjectURL(file));
    };
    const nidFile = (e) => {
        const file = e.target.files[0];
        setNidPhotoFile(file);
        setNidPhotoPreview(URL.createObjectURL(file));
    };

    const nomaniePhotoFile = (e) => {
        const file = e.target.files[0];
        setNPhotoFile(file);
        setNPhotoPreview(URL.createObjectURL(file));
    };
    const nomanieNidPhotoFile = (e) => {
        const file = e.target.files[0];
        setNnidPhotoFile(file);
        setNNidPhotoPreview(URL.createObjectURL(file));
    };

    const ManualFormPhotoFile = (e) => {
        const file = e.target.files[0];
        setMmanualFormPhotoFile(file);
        setManualFormPreview(URL.createObjectURL(file));
    };
  return (
    <div>
   <div className="container-fluid">
                <div className="row">
                    <div className="col-12">
                        <div className="card mt-1">
                            <div className="card-body">
                                <div className="row">
                                    <h5>Add Patner</h5>
                                    <hr className="bg-light"/>
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
                                              <label className="form-label">Patner Photo</label>
                                              <input
                                                  onChange={handleFile}
                                                  className="form-control form-control-md" type="file" />
                                              <br />
                                              {
                                                  photoPreview && <img src={photoPreview} alt="Preview" width="180" />
                                              }
                                          </div>
                                          <div className="col-4 p-2">
                                              <label className="form-label">Patner nid photo </label>
                                              <input
                                                  onChange={nidFile}
                                                  className="form-control form-control-md" type="file" />
                                              <br />
                                              {
                                                  nidPhotoPreview && <img src={nidPhotoPreview} alt="NID Preview" width="180" />
                                              }
                                          </div>
                                          <div className="col-4 p-2">
                                              <label className="form-label">Nominee photo</label>
                                              <input
                                                  onChange={nomaniePhotoFile}
                                                  className="form-control form-control-md" type="file" />
                                              <br />
                                              {
                                                  nPhotoPreview && <img src={nPhotoPreview} alt="Nominee Preview" width="180" />
                                              }

                                          </div>
                                      </div>

                                      <div className="row">
                                          <div className="col-4 p-2">
                                              <label className="form-label">Nominee nid Photo</label>
                                              <input
                                                  onChange={nomanieNidPhotoFile}
                                                  className="form-control form-control-md" type="file" />
                                              <br />
                                              {
                                                  nNidPhotoPreview && <img src={nNidPhotoPreview} alt="Nominee NID Preview" width="180" />
                                              }
                                          </div>
                                          <div className="col-4 p-2">
                                              <label className="form-label">Member manual form photo</label>
                                              <input
                                                  onChange={ManualFormPhotoFile}
                                                  className="form-control form-control-md" type="file" />
                                              <br />
                                              {
                                                  manualFormPreview && <img src={manualFormPreview} alt="Manual Form Preview" width="180" />
                                              }

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
            </div>
    </div>
  )
}

export default PatnerCreate
