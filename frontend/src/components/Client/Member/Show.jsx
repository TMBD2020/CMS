import React, {Fragment, useEffect, useState} from 'react';
import {useSelector} from "react-redux";
// import store from "../../redux/store/store";
// import {OnChangeCustomerInput} from "../../redux/state-slice/customer-slice";
// import {CreateCustomerRequest, FillCustomerFormRequest} from "../../APIRequest/CustomerAPIRequest";
import {ErrorToast, IsEmpty,SuccessToast} from "../../../helper/FormHelper";
import {apiURL} from '../../../helper/http'
import { useForm } from "react-hook-form";
import {useNavigate, useParams} from "react-router-dom";
import { AiOutlineDelete,AiOutlineEye, AiOutlineEdit } from "react-icons/ai";
import DataTable from 'react-data-table-component' 
import { Link } from "react-router-dom";
import loader from "../../../assets/images/loader.gif"


const MemberShowPage = () => {

    const [members, setMembers] = useState();
    const [filterText, setFilterText] = useState('');
    const [loading, setLoading] = useState(true);

     const fetchMember = async () => {
            try {
                const res = await fetch('http://localhost:8000/api/member', {
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
                setMembers(result.data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching member information:', error);
                setLoading(false);
            }
        }
        
        useEffect(() => {
            fetchMember();
        }, []);
    
        const columns = [
            { name: 'ID', selector: row => row.id, sortable: true },
            { name: 'NAME', selector: row => row.name, sortable: true },
            { name: 'DESIGNATION', selector: row => row.designation, sortable: true },
            { name: 'Email', selector: row => row.email, sortable: true },
            { name: 'PHONE', selector: row => row.phone, sortable: true },
            { name: 'NID', selector: row => row.nidNo, sortable: true },
            { name: 'BLOOD GROUP', selector: row => row.bGroup, sortable: true },
            { name: 'COMPANY', selector: row => row.company_name, sortable: true },
            { name: 'STATUS', cell: row => ( row.status === 1 ? 
            <button className="btn btn-outline-success text-success p-1 mb-0 btn-sm ms-0">Active</button> : 
            <button className="btn btn-outline-danger text-danger p-1 mb-0 btn-sm ms-0">Inactive</button> ), 
            sortable: true },
            { name: 'ACTION', cell: row => ( 
            <div> 
                 <Link to={`/member/edit/${row.id}`} className="btn text-info btn-outline-light p-2 mb-0 btn-sm">
                 <AiOutlineEye size={15} />
                 </Link>
            </div> 
            ) },
        ];
        const filteredItems = members && members.filter( 
            item => item.name && item.name.toLowerCase().includes(filterText.toLowerCase()) 
        );
  

    return (
        <Fragment>
           <div className="container-fluid my-5">
                <div className="row">
                    <div className="col-12">
                        <div className="card">
                            <div className="card-body">
                                <div className="container-fluid">
                                    <div className="row">
                                        <div className="col-6 mt-5">
                                            <h5>Member List</h5>
                                        </div>
                                        <div className="col-6 mt-5">
                                          <Link to={`/member/create`} >
                                              <button className="btn btn-success btn-sm mb-3 float-end" type="button">Add member</button>
                                          </Link>
                                        </div>
                                        {loading ? (
                                            <img src={loader} className='mx-auto d-block' alt="Loading..."  style={{width:60}} />
                                            //  <p className='text-center text-lg'>Loading...</p>
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
        </Fragment>
    );
};

export default MemberShowPage;