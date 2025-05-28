import React, { useEffect, useState } from 'react';
import { AreaChart, BarChart, Bar, PieChart, Pie, Cell, Legend, Text, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import CurrencyFormat from 'react-currency-format';
import '../../../Marquee.css'; 
import { Modal, Button } from 'react-bootstrap';

const AdminDashboard = () => {

    useEffect(() => {
        document.title = "CMS :: Company";
    }, []);

    const [notices, setNotices] = useState([]);
    const [loading, setLoading] = useState(true);
    const [project,setProject] = useState();
    const [bankAccount,setBankAccount] = useState();
    const [member,setMember] = useState();


    const fetchProject = async () => {
        try {
            const res = await fetch('http://localhost:8000/api/project', {
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
            setProject(result.totalProject);
        } catch (error) {
            console.error('Error fetching project:', error);
        }
    }
    
    useEffect(() => {
    fetchProject();
    }, []);

    const bankAccounts = async () => {
        try {
            const res = await fetch('http://localhost:8000/api/bankaccount', {
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
            setBankAccount(result.activeBankaccCount);
        } catch (error) {
            console.error('Error fetching bank account:', error);
        }
    }
    
    useEffect(() => {
        bankAccounts();
    }, []);

    const fetchmember = async () => {
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
            setMember(result.totalMember);
        } catch (error) {
            console.error('Error fetching member:', error);
        }
    }
    
    useEffect(() => {
        fetchmember();
    }, []);

    const fetchNotice = async () => {
        try {
            const res = await fetch('http://localhost:8000/api/notice', {
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

    const NoticeModal = ({ show, handleClose, notice }) => {
         return ( 
         <Modal show={show} onHide={handleClose}> 
         <Modal.Header closeButton> <Modal.Title>{notice.title}</Modal.Title> 
         </Modal.Header> <Modal.Body> <p>{notice.details}</p> <p><strong>Date:</strong> {notice.date}</p> 
         <p><strong>Time:</strong> {notice.time}</p> </Modal.Body> <Modal.Footer> 
        <Button variant="success" onClick={handleClose}> Close </Button> 
        </Modal.Footer> 
    </Modal> 
    ); 
   };

   const [showModal, setShowModal] = useState(false); 
   const [selectedNotice, setSelectedNotice] = useState({});

    const handleShowModal = (notice) => {
        setSelectedNotice(notice);
        setShowModal(true);
    }; 

    const handleCloseModal = () => {
        setShowModal(false);
        setSelectedNotice({});
    };


    const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#AB83A1', '#A4DE6C'];
    // Static data for charts
    const staticExpenseChart = [
        { name: 'January', value: 60 },
        { name: 'February', value: 50 },
        { name: 'March', value: 80 },
        { name: 'April', value: 80 },
        { name: 'May', value: 50 },
        { name: 'June', value: 60 },
        { name: 'July', value: 30 },
    ];
    const staticSaleChart = [
        { month: 'January', sales: 60 },
        { month: 'February', sales: 50 },
        { month: 'March', sales: 80 },
        { month: 'April', sales: 80 },
        { month: 'May', sales: 50 },
        { month: 'June', sales: 60 },
        { month: 'July', sales: 30 },
    ];

    const data = [
        { title: 'Total Project', value: project !== undefined ? project : 'Loading...', color: 'linear-gradient(135deg, #f6d365 0%, #fda085 100%)' },
        { title: 'Total Bank Accounts', value: bankAccount !== undefined ? bankAccount : 'Loading...', color: 'linear-gradient(135deg, #a1c4fd 0%, #c2e9fb 100%)' },
        { title: 'Total Employees', value: '100', color: 'linear-gradient(135deg, #d4fc79 0%, #96e6a1 100%)' },
        { title: 'Total Member', value: member !== undefined ? member : 'Loading...', color: 'linear-gradient(135deg, #fbc2eb 0%, #a6c1ee 100%)' },
    ];
    // Static totals
    const staticExpenseTotal = 7000;
    const staticSaleTotal = 15000;

    return (
        <div className="container-fluid">
            {/* notice */}
            <div className='mb-3' style={{ background: '#ddd', alignItems: 'center', display: 'flex' }}> 
                <span style={{ color: '#000', padding: '6px 10px', textTransform: 'uppercase', borderRight: '1px solid #fff' }}>Notice</span> 
                <div className="marquee-container"> <div className="marquee"> 
                    {notices && notices.filter(notice => notice.status === 1)
                    .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
                    .slice(0, 3).map((notice, index) => { const noticeDate = new Date(notice.created_at)
                    .toLocaleDateString('en-BD', { 
                        year: 'numeric', month: 'short', day: 'numeric', timeZone: 'Asia/Dhaka' 
                        }); 
                        const noticeTime = new Date(notice.created_at)
                        .toLocaleTimeString('en-BD', { hour: '2-digit', minute: '2-digit', timeZone: 'Asia/Dhaka' }); 
                        return ( 
                        <div key={index} className="marquee-item"
                          onMouseOver={() => document.getElementById(`marquee-${index}`)
                          .style.animationPlayState = 'paused'} onMouseOut={() => document.getElementById(`marquee-${index}`)
                          .style.animationPlayState = 'running'} onClick={() => handleShowModal({ title: notice.title, details: notice.description || 'No additional details provided.', date: noticeDate, time: noticeTime })} id={`marquee-${index}`} > 
                          <a details="" noticetitle={notice.title} noticedate={`${noticeDate} ${noticeTime}`} style={{ display: 'inline', textDecoration: 'none', color: '#000', fontSize: 16, fontWeight: 'bold' }} href="javascript:void(0)" id="noticeTitle" >
                             <label className="badge" style={{ margin: 0, color: '#000', borderRadius: 0 }}>
                                 {noticeDate} {noticeTime}
                             </label> 
                             | {notice.title} 
                             </a>
                              &nbsp;&nbsp;&nbsp;
                               </div> 
                            ); 
                            })}
                              </div>
                              </div> <NoticeModal show={showModal} handleClose={handleCloseModal} notice={selectedNotice} /> 
            </div>
            <div className="row">
                {data.map((item, index) => (
                    <div className="col-md-3 mb-4 col-sm-12" key={index}>
                        <div className="card text-black" style={{ background: item.color }}>
                            <div className="card-body">
                                <div className="d-flex align-items-center">
                                    <div>
                                        <h5 className="card-title">{item.title}</h5>
                                        <p className="card-text">{item.value}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            <div className="row">
                <div className="col-md-6 p-2 col-sm-12">
                    <div className="card">
                        <div className="card">
                            <div className="card-body">
                                <span className="h6">Project Report</span>
                                <ResponsiveContainer className="mt-4" width="100%" height={280}>
                                    <PieChart>
                                        <Pie
                                            data={staticExpenseChart}
                                            dataKey="value"
                                            nameKey="name"
                                            cx="50%"
                                            cy="50%"
                                            outerRadius={100}
                                            fill="#8884d8"
                                            label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                                        >
                                            {staticExpenseChart.map((entry, index) => (
                                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                            ))}
                                        </Pie>
                                        <Tooltip />
                                        <Legend />
                                    </PieChart>
                                </ResponsiveContainer>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-md-6 p-2 col-sm-12">
                    <div className="card">
                        <div className="card-body">
                            <span className="h6">Profit/Loss Analytics</span>
                            <ResponsiveContainer className="mt-4" width="100%" height={250}>
                                <BarChart data={staticSaleChart}>
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis dataKey="month" />
                                    <YAxis />
                                    <Tooltip />
                                    <Bar dataKey="sales" fill="#8884d8" />
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;
