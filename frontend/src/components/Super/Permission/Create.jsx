import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { ErrorToast, SuccessToast } from "../../../helper/FormHelper";
import { Nav, Tab } from "react-bootstrap";
import DataTable from 'react-data-table-component' 
import loader from "../../../assets/images/loader.gif"
import { Link } from "react-router-dom";
import { AiOutlineDelete,AiOutlineEye, AiOutlineEdit } from "react-icons/ai";

function PermissionRoleCreate() {

  useEffect(() => {
    document.title = "CMS:: Permission Role Create";
  }, []);

  
  const [company,setCompany] = useState();
  const [role,setRoles] = useState([]);
  const [permissions, setPermissions] = useState([]);
  const [filterText, setFilterText] = useState('');
  const [loading, setLoading] = useState(true);

    const {
        register: registerRole,
        handleSubmit: handleSubmitRole,
        formState: { errors: errorsRole },
    } = useForm();

    const {
        register: registerPermission,
        handleSubmit: handleSubmitPermission,
        formState: { errors: errorsPermission },
    } = useForm();

    const navigate = useNavigate();
    
    const fetchRoles = async () => {
      try {
          const res = await fetch('http://localhost:8000/api/roles', {
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
          // console.log("Roles API Response:", result); // Debugging line
          if (Array.isArray(result.data)) {
              setRoles(result.data);
          } else {
              console.error("Expected array but got:", result.data);
              setRoles([]); // Fallback to empty array
          }
          setLoading(false);
      } catch (error) {
          console.error('Error fetching roles:', error);
          setLoading(false);
      }
    };
    

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
            console.error('Error fetching companies:', error);
        }
    }

    const fetchPermissions = async () => {
        try {
            const res = await fetch('http://localhost:8000/api/permission', {
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
            setPermissions(result.data);
        } catch (error) {
            console.error('Error fetching permissions:', error);
        }
    }

    useEffect(() => {
        fetchCompany();
        fetchPermissions();
        fetchRoles();
    }, []);

const columns = [
        { name: '#', selector: row => row.id, sortable: true },
        { name: 'ROLE NAME', selector: row => row.name, sortable: true },
        { name: 'ROLE FOR', selector: row => row.role_for, sortable: true },
        // { name: 'STATUS', cell: row => ( row.status === 1 ? 
        //     <button className="btn btn-outline-success text-success p-1 mb-0 btn-sm ms-0">Active</button> : 
        //     <button className="btn btn-outline-danger text-danger p-1 mb-0 btn-sm ms-0">Inactive</button> ), 
        //     sortable: true },
        { name: 'ACTION', cell: row => ( 
        <div> 
             <Link to={`/bank-accounts/details/${row.id}`} className="btn text-info btn-outline-light p-2 mb-0 btn-sm">
             <AiOutlineEye size={15} />
             </Link>
        </div> 
        ) },
    ];
    const filteredItems = Array.isArray(role) ? 
    role.filter(item => item.name && item.name.toLowerCase().includes(filterText.toLowerCase())) : [];


    const onSubmitPermission = async (data) => {
        try {
            const res = await fetch('http://localhost:8000/api/permission', {
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
                SuccessToast("Permission addedd Successfully!")
                navigate('/roles')
            } else {
                ErrorToast("Permission not add!")
            }
        } catch (error) {
            console.error('Error fetching Bank Permission:', error);
        }
    }

    const onSubmitRole = async (data) => {
        try {
            const res = await fetch('http://localhost:8000/api/roles', {
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
                SuccessToast("Role addedd Successfully!")
                navigate('/roles')
            } else {
                ErrorToast("Role not add!")
            }
        } catch (error) {
            console.error('Error fetching Bank Role:', error);
        }
    }


    return (
        <div className="container-fluid">
        <div className="row">
      <div className="col-md-12">
      <div className="row">
          <div className="col-12">
            <div className="card mt-1">
              <div className="card-body">
                <Tab.Container defaultActiveKey="roles" className="">
              <Nav variant="tabs">
                <Nav.Item>
                  <Nav.Link eventKey="roles" className="tabText">Roles</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey="expense" className="tabText">Roles List</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey="permission" className="tabText">Permission</Nav.Link>
                </Nav.Item>
              </Nav>
              <Tab.Content>
                <Tab.Pane eventKey="roles">
                  <div className="card mt-1">
                    <div className="card-body">
                      <h5>Add Roles</h5>
                      <hr className="bg-light" />
                      <form onSubmit={handleSubmitRole(onSubmitRole)}>
                        <div className="row">
                          <div className="col-4 p-2">
                            <label className="form-label">Role Name </label>
                            <input
                              {...registerRole("name")}
                              className="form-control form-control-sm"
                              type="text"
                            />
                          </div>
                          {/* <div className="col-4 p-2">
                            <label className="form-label">Company <span style={{ color: "red" }} title='required'>*</span></label>
                                <select
                                {
                                 ...registerRole('companyId', {
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
                                    errorsRole.companyId && ErrorToast("Company field is required !")
                                }
                          </div> */}
                          <div className="col-4 p-2">
                            <label className="form-label">Roles For</label>
                            <select
                              {...registerRole("role_for")}
                              className="form-select form-select-sm"
                            >
                                <option selected>Select</option>
                                <option value="member">Member</option>
                                <option value="employee">Employee</option>
                            </select>

                          </div>
                          </div>
                          {/* <div className="row">
                          <div className="col-4 p-2">
                            <label className="form-label">Permissions</label>
                                <div className="form-check">
                                 {permissions && permissions.map(permission => (
                               <div key={permission.id}>
                                <input
                                {...registerRole("permission")}
                                    className="form-check-input"
                                    type="checkbox"
                                    value={permission.name}
                                    id={`permission-${permission.id}`}
                                    />
                                <label className="form-check-label" htmlFor={`permission-${permission.id}`}>
                                {permission.name}
                                </label>
                             </div>
                            ))}
                        </div>
                        </div>
                        </div> */}
                                <div className="row">
                                  <div className="col-12 p-2">
                                    <label className="form-label mb-3">Permissions</label>
                                    <table className="table table-bordered">
                                      <thead>
                                        <tr>
                                          <th>Module</th>
                                          <th>View</th>
                                          <th>Add</th>
                                          <th>Update</th>
                                          <th>Delete</th>
                                        </tr>
                                      </thead>
                                      <tbody>
                                        <tr>
                                          <td>Users</td>
                                          <td>
                                            <input
                                              {...registerRole("permission")}
                                              className="custom-checkbox"
                                              type="checkbox"
                                              value="viewUser"
                                              id="permission-view-user"
                                            />
                                          </td>
                                          <td>
                                            <input
                                              {...registerRole("permission")}
                                              className="custom-checkbox"
                                              type="checkbox"
                                              value="addUser"
                                              id="permission-add-user"
                                            />
                                          </td>
                                          <td>
                                            <input
                                              {...registerRole("permission")}
                                              className="custom-checkbox"
                                              type="checkbox"
                                              value="updateUser"
                                              id="permission-update-user"
                                            />
                                          </td>
                                          <td>
                                            <input
                                              {...registerRole("permission")}
                                              className="custom-checkbox"
                                              type="checkbox"
                                              value="deleteUser"
                                              id="permission-delete-user"
                                            />
                                          </td>
                                        </tr>
                                        <tr>
                                          <td>Members</td>
                                          <td>
                                            <input
                                              {...registerRole("permission")}
                                              className="custom-checkbox"
                                              type="checkbox"
                                              value="viewMember"
                                              id="permission-view-member"
                                            />
                                          </td>
                                          <td>
                                            <input
                                              {...registerRole("permission")}
                                              className="custom-checkbox"
                                              type="checkbox"
                                              value="addMember"
                                              id="permission-add-member"
                                            />
                                          </td>
                                          <td>
                                            <input
                                              {...registerRole("permission")}
                                              className="custom-checkbox"
                                              type="checkbox"
                                              value="updateMember"
                                              id="permission-update-member"
                                            />
                                          </td>
                                          <td>
                                            <input
                                              {...registerRole("permission")}
                                              className="custom-checkbox"
                                              type="checkbox"
                                              value="deleteMember"
                                              id="permission-delete-member"
                                            />
                                          </td>
                                        </tr>
                                        {/* Add more static modules as needed */}
                                      </tbody>
                                    </table>
                                  </div>
                                </div>
                        <div className="row">
                          <div className="col-4 p-2">
                            <button
                              className="btn btn-sm my-3 btn-success"
                            >
                              Submit
                            </button>
                          </div>
                        </div>
                      </form>
                    </div>
                  </div>
                </Tab.Pane>
                <Tab.Pane eventKey="expense">
                  <div className="card mt-1">
                    <div className="card-body">
                      <h5>Roles List</h5>
                      <hr className="bg-light" />
                      <div className="row">
                        <div className="col-12 p-2">
                                  {loading ? (
                                    <img src={loader} className='mx-auto d-block' alt="Loading..." style={{ width: 60 }} />
                                  ) : (
                                    // <DataTable
                                    //   columns={columns}
                                    //   data={filteredItems || []}
                                    //   pagination 
                                    //   fixedHeader
                                    //   subHeader
                                    //   subHeaderComponent={
                                    //     <input type="text"
                                    //       placeholder="Search"
                                    //       value={filterText}
                                    //       onChange={e => setFilterText(e.target.value)} className="w-25 form-control" />
                                    //   }
                                    // />
                                      <DataTable
                                        columns={columns}
                                        data={filteredItems.length > 0 ? filteredItems : []} // Ensure an array
                                        pagination
                                        fixedHeader
                                        subHeader
                                        subHeaderComponent={
                                          <input
                                            type="text"
                                            placeholder="Search"
                                            value={filterText}
                                            onChange={e => setFilterText(e.target.value)}
                                            className="w-25 form-control"
                                          />
                                        }
                                      />

                                  )}
                                </div>
                      </div>
                    </div>
                  </div>
                </Tab.Pane>
                <Tab.Pane eventKey="permission">
                  <div className="card mt-1">
                    <div className="card-body">
                    <h5>Add Permission</h5>
                      <hr className="bg-light" />
                      <form onSubmit={handleSubmitPermission(onSubmitPermission)}>
                        <div className="row">
                          <div className="col-4 p-2">
                            <label className="form-label">Permission Name </label>
                            <input
                              {...registerPermission("name")}
                              className="form-control form-control-sm"
                              type="text"
                            />
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-4 p-2">
                            <button
                              className="btn btn-sm my-3 btn-success"
                            >
                              Submit
                            </button>
                          </div>
                        </div>
                      </form>

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
      </div> 
    );
}

export default PermissionRoleCreate;
