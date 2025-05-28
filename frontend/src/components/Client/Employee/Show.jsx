import React, { Fragment, useEffect, useState } from 'react';
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { AiOutlineDelete,AiOutlineEye, AiOutlineEdit } from "react-icons/ai";
import ReactPaginate from "react-paginate";
import {apiURL} from '../../../helper/http'
import {ErrorToast, IsEmpty,SuccessToast} from "../../../helper/FormHelper";
import DataTable from 'react-data-table-component' 
import loader from "../../../assets/images/loader.gif"


function EmployeeShow() {

    useEffect(() => {
        document.title = "CMS ::Employee information";
    }, []);
    const [employee,setEmployee] = useState();
    const [filterText, setFilterText] = useState('');
    const [loading, setLoading] = useState(true);

    const fetchEmployee = async () => {
        try {
            const res = await fetch('http://localhost:8000/api/employees', {
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
            setEmployee(result.data);
        } catch (error) {
            console.error('Error fetching employee:', error);
        } finally {
            setLoading(false); 
        }
    }
    
    useEffect(() => {
        fetchEmployee();
    }, []);

    const columns = [
        { name: '#', selector: row => row.id, sortable: true },
        { name: 'Designation', selector: row => row.designations_name, sortable: true },
        { name: 'Name', selector: row => row.name, sortable: true },
        { name: 'Phone', selector: row => row.phone, sortable: true },
        { name: 'STATUS', cell: row => ( row.status === 1 ? 
            <button className="btn btn-outline-success text-success p-1 mb-0 btn-sm ms-0">Active</button> : 
            <button className="btn btn-outline-danger text-danger p-1 mb-0 btn-sm ms-0">Inactive</button> ), 
            sortable: true },
        { name: 'ACTION', cell: row => ( 
        <div> 
             <Link to={`/employee/details/${row.id}`} className="btn text-info btn-outline-light p-2 mb-0 btn-sm">
             <AiOutlineEye size={15} />
             </Link>
        </div> 
        ) },
    ];
    const filteredItems = employee && employee.filter( 
        item => item.name && item.name.toLowerCase().includes(filterText.toLowerCase()) 
    );
   
    
  return (
    <div>
      <div className="container-fluid my-5">
                <div className="row">
                    <div className="col-12">
                        <div className="card">
                            <div className="card-body">
                                <div className="container-fluid">
                                    <div className="row">
                                        <div className="col-6 mt-5">
                                            <h5>Employee List</h5>
                                        </div>
                                        <div className="col-6 mt-5">
                                          <Link to={`/employee/create`} >
                                              <button className="btn btn-success btn-sm mb-3 float-end" type="button">Add Employee info</button>
                                          </Link>
                                        </div>
                                        {loading ? (
                                     <img src={loader} className='mx-auto d-block' alt="Loading..."  style={{width:60}} />
                                            ) : (
                                        <DataTable 
                                        columns={columns} 
                                        data={filteredItems || []} 
                                        pagination fixedHeader
                                        subHeader
                                        subHeaderComponent={
                                        <input type="text" 
                                        placeholder="Search" 
                                        value={filterText} 
                                        onChange={e => setFilterText(e.target.value)} className="w-25 form-control"/>
                                        }
                                        />
                                    )}
                            
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
    </div>
  )
}

export default EmployeeShow
