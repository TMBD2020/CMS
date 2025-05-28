import React, { Fragment, useEffect, useState } from 'react';
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { AiOutlineDelete,AiOutlineEye, AiOutlineEdit } from "react-icons/ai";
import ReactPaginate from "react-paginate";
import {apiURL} from '../../../helper/http'
import {ErrorToast, IsEmpty,SuccessToast} from "../../../helper/FormHelper";
import DataTable from 'react-data-table-component' 
import loader from "../../../assets/images/loader.gif"


function NoticeShow() {

    const [notices,setNotices] = useState();
    const [filterText, setFilterText] = useState('');
    const [loading, setLoading] = useState(true);

    const fetchNotice = async () => {
        try {
            const res = await fetch('http://localhost:8000/api/notices', {
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
            setNotices(result.data);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching notices:', error);
            setLoading(false);
        }
    }
    
    useEffect(() => {
    fetchNotice();
    }, []);

    const columns = [
        { name: 'ID', selector: row => row.id, sortable: true },
        { name: 'TITLE', selector: row => row.title, sortable: true },
        { 
            name: 'STATUS', 
            cell: row => (
                row.status === 3 ? 
                    <button className="btn btn-outline-warning text-warning p-1 mb-0 btn-sm ms-0">Draft</button> :
                row.status === 1 ? 
                    <button className="btn btn-outline-success text-success p-1 mb-0 btn-sm ms-0">Active</button> : 
                    <button className="btn btn-outline-danger text-danger p-1 mb-0 btn-sm ms-0">Inactive</button>
            ), 
            sortable: true 
        },
        { name: 'ACTION', cell: row => ( 
        <div> 
             <Link to={`/notices/details/${row.id}`} className="btn text-info btn-outline-light p-2 mb-0 btn-sm">
             <AiOutlineEye size={15} />
             </Link>
        </div> 
        ) },
    ];
    const filteredItems = notices && notices.filter( 
        item => item.title && item.title.toLowerCase().includes(filterText.toLowerCase()) 
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
                                            <h5>Notice List</h5>
                                        </div>
                                        <div className="col-6 mt-5">
                                          <Link to={`/notice/create`} >
                                              <button className="btn btn-success btn-sm mb-3 float-end" type="button">Add Notice</button>
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

export default NoticeShow
