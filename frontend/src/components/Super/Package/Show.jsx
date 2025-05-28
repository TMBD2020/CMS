import React, { Fragment, useEffect, useState } from 'react';
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { AiOutlineDelete,AiOutlineEye, AiOutlineEdit } from "react-icons/ai";
import ReactPaginate from "react-paginate";
import {apiURL} from '../../../helper/http'
import {ErrorToast, IsEmpty,SuccessToast} from "../../../helper/FormHelper";



function PackageShow() {

    const [packages,setPackages] = useState();
    // const fetchPackages = async () => {
    //     try {
    //         const res = await fetch(`${apiUrl}services`, {
    //             method: 'GET',
    //             headers: {
    //                 'Content-Type': 'application/json',
    //                 'Accept': 'application/json',
    //                 // 'Authorization': `Bearer ${token()}`
    //             }
    //         });

    //         if (!res.ok) {
    //             throw new Error(`Network response was not ok: ${res.statusText}`);
    //         }

    //         const result = await res.json();
    //         setPackages(result.data);
    //     } catch (error) {
    //         console.error('Error fetching packages:', error);
    //     }
    // };

    const fetchPackages = async () => {
        try {
            const res = await fetch('http://localhost:8000/api/packages', {
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
            setPackages(result.data);
        } catch (error) {
            console.error('Error fetching packages:', error);
        }
    }
    
    useEffect(() => {
        fetchPackages();
    }, []);

    // const deletePackage = async(id) =>{
    //    if(confirm("Are you are sure went delete?")){
    //     const res = await fetch('http://localhost:8000/api/packages/'+id, {
    //         method: 'DELETE',
    //         headers: {
    //             'Content-Type': 'application/json',
    //             'Accept': 'application/json',
    //         }
    //     });
    //     const result = await res.json();
    //     if(result.status == true){
    //      const newPackage = packages.filter(packageData => packageData.id != id)
    //      setPackages(newPackage);
    //      SuccessToast("Package delete Successfully!")
    //     }else{
    //         ErrorToast("Package not delete!")
    //     }
    //    }
        
    // }

    const deletePackage = async (id) => {
        if (confirm("Are you sure you want to delete this package?")) {
            try {
                const res = await fetch(`http://localhost:8000/api/packages/${id}`, {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json',
                    }
                });
    
                const result = await res.json();
                if (result.status === true) {
                    const newPackageList = packages.filter(packageData => packageData.id !== id);
                    setPackages(newPackageList);
                    SuccessToast("Package deleted successfully!");
                } else {
                    ErrorToast("Failed to delete package.");
                }
            } catch (error) {
                console.error("Error deleting package:", error);
                ErrorToast("An error occurred. Please try again.");
            }
        }
    };
    



//   let [searchKeyword, setSearchKeyword] = useState("0");
//     let [perPage, setPerPage] = useState(20);

//     useEffect(() => {
//         (async () => {
//             await CustomerListRequest(1, perPage, searchKeyword);
//         })();
//     }, [])

//     let DataList = useSelector((state) => (state.customer.List));
//     let Total = useSelector((state) => (state.customer.ListTotal))

//     const handlePageClick = async (event) => {
//         await CustomerListRequest(event.selected + 1, perPage, searchKeyword)
//     };
//     const searchData = async () => {
//         await CustomerListRequest(1, perPage, searchKeyword)
//     }
//     const perPageOnChange = async (e) => {
//         setPerPage(parseInt(e.target.value))
//         await CustomerListRequest(1, e.target.value, searchKeyword)
//     }
//     const searchKeywordOnChange = async (e) => {
//         setSearchKeyword(e.target.value)
//         if ((e.target.value).length === 0) {
//             setSearchKeyword("0")
//             await CustomerListRequest(1, perPage, "0")
//         }
//     }

//     const TextSearch = (e) => {
//         const rows = document.querySelectorAll('tbody tr')
//         rows.forEach(row => {
//             row.style.display = (row.innerText.includes(e.target.value)) ? '' : 'none'
//         })
//     }

//     const DeleteItem = async (id) => {
//         let Result = await DeleteAlert();
//         if (Result.isConfirmed) {
//             let DeleteResult = await DeleteCustomerRequest(id)
//             if (DeleteResult) {
//                 await CustomerListRequest(1, perPage, searchKeyword);
//             }
//         }
//     }

  return (
    <div>
      <div className="container-fluid my-5">
                <div className="row">
                    <div className="col-12">
                        <div className="card">
                            <div className="card-body">
                                <div className="container-fluid">
                                    <div className="row">
                                        <div className="col-6">
                                            <h5>Package List</h5>
                                        </div>
                                        

                                        {/* <div className="col-2">
                                            <input onKeyUp={TextSearch} placeholder="Text Filter" className="form-control form-control-sm" />
                                        </div> */}

                                        <div className="col-2">
                                            <select  className="form-control mx-2 form-select-sm form-select form-control-sm" >
                                                <option value="20">20 Per Page</option>
                                                <option value="30">30 Per Page</option>
                                                <option value="50">50 Per Page</option>
                                                <option value="100">100 Per Page</option>
                                                <option value="100">200 Per Page</option>
                                            </select>
                                        </div>
                                        <div className="col-4">
                                            <div className="input-group mb-3">
                                                <input  type="text" className="form-control form-control-sm" placeholder="Search.." aria-label="Recipient's username" aria-describedby="button-addon2" />
                                                <button  className="btn  btn-success btn-sm mb-0" type="button">Search</button>
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
                                                        <td className="text-uppercase text-darkk">Package name</td>
                                                        <td className="text-uppercase text-darkk">Monthly fee</td>
                                                        <td className="text-uppercase text-darkk">Member limit</td>
                                                        <td className="text-uppercase text-darkk">Employee Limit</td>
                                                        <td className="text-uppercase text-darkk">Account limit</td>
                                                        <td className="text-uppercase text-darkk">Status</td>
                                                        <td className="text-uppercase text-darkk">Action</td>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {
                                                          packages && packages.map(packageData =>{
                                                            return(
                                                                <tr key={`packageData-${packageData.id}`} className='text-darkk'>
                                                                <td>{packageData.id}</td>   
                                                                <td><Link to={`/package/edit/${packageData.id}`}><p className="text-xs  text-start">{packageData.title}</p></Link></td>
                                                                <td><p className="text-xs text-start">{packageData.monthlyFee}</p></td>
                                                                <td><p className="text-xs text-start">{packageData.memberLimit}</p></td>
                                                                <td><p className="text-xs text-start">{packageData.employeeLimit}</p></td>
                                                                <td><p className="text-xs text-start">{packageData.accountLimit}</p></td>
                                                                <td><p className="text-xs text-start">
                                                                {
                                                                    (packageData.status == 1)
                                                                        ? <button className="btn btn-outline-success text-success p-1 mb-0 btn-sm ms-0">Active</button>
                                                                        : <button className="btn btn-outline-danger text-danger p-1 mb-0 btn-sm ms-0">Deactive</button>
                                                                }
                                                                    </p>
                                                                    </td>
                                                                <td>
                                                                    <Link to={`/package/edit/${packageData.id}`} className="btn text-info btn-outline-light p-2 mb-0 btn-sm">
                                                                        <AiOutlineEye size={15} />
                                                                    </Link>
    
                                                                        {/* <button onClick={() => deletePackage(packageData.id)} className="btn btn-outline-light text-danger p-2 mb-0 btn-sm ms-2">
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
    </div>
  )
}

export default PackageShow
