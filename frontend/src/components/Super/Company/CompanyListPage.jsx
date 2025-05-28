import React, { Fragment, useEffect, useState } from 'react';
//import {CustomerListRequest, DeleteCustomerRequest} from "../../APIRequest/CustomerAPIRequest";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { AiOutlineDelete, AiOutlineEdit, AiOutlineEye } from "react-icons/ai";
import ReactPaginate from "react-paginate";
import { DeleteAlert } from "../../../helper/DeleteAlert";


const CustomerList = () => {
    
    useEffect(() => {
        document.title = "CMS :: company list";
    }, []);

    let [companies,setCompanies]=useState();

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
            setCompanies(result.data);
        } catch (error) {
            console.error('Error fetching packages:', error);
        }
    }
    
    useEffect(() => {
        fetchCompany();
    }, []);

    // let [searchKeyword, setSearchKeyword] = useState("0");
    // let [perPage, setPerPage] = useState(20);

    // useEffect(() => {
    //     (async () => {
    //         await CustomerListRequest(1, perPage, searchKeyword);
    //     })();
    // }, [])

    // let DataList = useSelector((state) => (state.customer.List));
    // let Total = useSelector((state) => (state.customer.ListTotal))

    // const handlePageClick = async (event) => {
    //     await CustomerListRequest(event.selected + 1, perPage, searchKeyword)
    // };
    // const searchData = async () => {
    //     await CustomerListRequest(1, perPage, searchKeyword)
    // }
    // const perPageOnChange = async (e) => {
    //     setPerPage(parseInt(e.target.value))
    //     await CustomerListRequest(1, e.target.value, searchKeyword)
    // }
    // const searchKeywordOnChange = async (e) => {
    //     setSearchKeyword(e.target.value)
    //     if ((e.target.value).length === 0) {
    //         setSearchKeyword("0")
    //         await CustomerListRequest(1, perPage, "0")
    //     }
    // }

    // const TextSearch = (e) => {
    //     const rows = document.querySelectorAll('tbody tr')
    //     rows.forEach(row => {
    //         row.style.display = (row.innerText.includes(e.target.value)) ? '' : 'none'
    //     })
    // }

    // const DeleteItem = async (id) => {
    //     let Result = await DeleteAlert();
    //     if (Result.isConfirmed) {
    //         let DeleteResult = await DeleteCustomerRequest(id)
    //         if (DeleteResult) {
    //             await CustomerListRequest(1, perPage, searchKeyword);
    //         }
    //     }
    // }

    return (
        <Fragment>
            <div className="container-fluid my-5">
                <div className="row">
                    <div className="col-12">
                        <div className="card">
                            <div className="card-body">
                                <div className="container-fluid">
                                    <div className="row">
                                        <div className="col-4">
                                            <h5>Company List</h5>
                                        </div>

                                        <div className="col-2">
                                            <input onKeyUp="" placeholder="Text Filter" className="form-control form-control-sm" />
                                        </div>

                                        <div className="col-2">
                                            <select onChange="" className="form-control mx-2 form-select-sm form-select form-control-sm" >
                                                <option value="20">20 Per Page</option>
                                                <option value="30">30 Per Page</option>
                                                <option value="50">50 Per Page</option>
                                                <option value="100">100 Per Page</option>
                                                <option value="100">200 Per Page</option>
                                            </select>
                                        </div>
                                        <div className="col-4">
                                            <div className="input-group mb-3">
                                                <input onChange="" type="text" className="form-control form-control-sm" placeholder="Search.." aria-label="Recipient's username" aria-describedby="button-addon2" />
                                                <button onClick="" className="btn  btn-success btn-sm mb-0" type="button">Search</button>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-12">
                                            <div className="table-responsive table-section">
                                                <table className="table ">
                                                    <thead className="sticky-top bg-white">
                                                        <tr>
                                                        <td className="text-uppercase text-darkk">No</td>
                                                        <td className="text-uppercase text-darkk">Date</td>
                                                        <td className="text-uppercase text-darkk">Name</td>
                                                        <td className="text-uppercase text-darkk">Phone</td>
                                                        <td className="text-uppercase text-darkk">Email</td>
                                                        <td className="text-uppercase text-darkk">Starting balance</td>
                                                        <td className="text-uppercase text-darkk">Share price</td>
                                                        <td className="text-uppercase text-darkk">Packege</td>
                                                        <td className="text-uppercase text-darkk">Status</td>
                                                        <td className="text-uppercase text-darkk">Action</td>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {
                                                        companies && companies.map(CompanyData =>{
                                                            return(
                                                        <tr key={`CompanyData-${CompanyData.id}`} className='text-darkk'>
                                                            <td><p className="text-xs text-start">{CompanyData.id}</p></td>
                                                            <td><p className="text-xs text-start">{CompanyData.date}</p></td>
                                                            <td><p className="text-xs text-start">{CompanyData.name}</p></td>
                                                            <td><p className="text-xs text-start">{CompanyData.phone}</p></td>
                                                            <td><p className="text-xs text-start">{CompanyData.email}</p></td>
                                                            <td><p className="text-xs text-start">{CompanyData.startingBalance}</p></td>
                                                            <td><p className="text-xs text-start">{CompanyData.sharePrice}</p></td>
                                                            <td><p className="text-xs text-start">{CompanyData.package_name}</p></td>
                                                            <td><p className="text-xs text-start">
                                                            {
                                                                    (CompanyData.status == 1)
                                                                        ? <button className="btn btn-outline-success text-success p-1 mb-0 btn-sm ms-0">Active</button>
                                                                        : <button className="btn btn-outline-danger text-danger p-1 mb-0 btn-sm ms-0">Deactive</button>
                                                                }
                                                                </p>
                                                            </td>
                                                            <td>
                                                            <Link to={`/company/edit/${CompanyData.id}`} className="btn text-info btn-outline-light p-2 mb-0 btn-sm">
                                                                        <AiOutlineEye size={15} />
                                                                    </Link>

                                                                {/* <button className="btn btn-outline-light text-danger p-2 mb-0 btn-sm ms-2">
                                                                    <AiOutlineDelete size={15} />
                                                                </button> */}
                                                            </td>
                                                        </tr>
                                                            )
                                                        }) 
                                                     }
                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>
                                        <div className="col-12 mt-5">
                                            <nav aria-label="Page navigation example">
                                                <ReactPaginate
                                                    previousLabel="<"
                                                    nextLabel=">"
                                                    pageClassName="page-item"
                                                    pageLinkClassName="page-link"
                                                    previousClassName="page-item"
                                                    previousLinkClassName="page-link"
                                                    nextClassName="page-item"
                                                    nextLinkClassName="page-link"
                                                    breakLabel="..."
                                                    breakClassName="page-item"
                                                    breakLinkClassName="page-link"
                                                    // pageCount={Total / perPage}
                                                    // marginPagesDisplayed={2}
                                                    // pageRangeDisplayed={5}
                                                    // onPageChange={handlePageClick}
                                                    containerClassName="pagination"
                                                    activeClassName="active"
                                                />
                                            </nav>
                                        </div>
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

export default CustomerList;