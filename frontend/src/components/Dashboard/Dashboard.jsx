import React from 'react';
import { AreaChart, BarChart, Bar, PieChart, Pie, Cell, Legend, Text, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import CurrencyFormat from 'react-currency-format';

const Dashboard = () => {
    const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#AB83A1', '#A4DE6C',];
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
        { title: 'Total Company', value: '100', color: 'linear-gradient(135deg, #f6d365 0%, #fda085 100%)' },
        { title: 'Total User', value: '100', color: 'linear-gradient(135deg, #a1c4fd 0%, #c2e9fb 100%)' },
        { title: 'Total Project', value: '100', color: 'linear-gradient(135deg, #d4fc79 0%, #96e6a1 100%)' },
        { title: 'Total Insvestor', value: '100', color: 'linear-gradient(135deg, #fbc2eb 0%, #a6c1ee 100%)' },
    ];
    // Static totals
    const staticExpenseTotal = 7000;
    const staticSaleTotal = 15000;

    return (
        <div className="container-fluid">

            <div className='mb-3' style={{ background: '#ddd', alignItems: 'center', display: 'flex' }}>
                <span style={{ color: '#000', padding: '6px 10px', textTransform: 'uppercase', borderRight: '1px solid #fff' }}>Notice</span>
                <marquee onmouseover="this.stop();" onmouseout="this.start();" behavior direction="left" className="custom-padding">
                    <a details="<p>Your service will continue,if you renuable bill</p>" noticetitle="Your service will continue,if you renuable bill" noticedate="Oct  9, 2024" style={{ display: 'inline', textDecoration: 'none', color: '#000', fontSize: 16, fontWeight: 'bold' }}
                        href="javascript:void(0)" id="noticeTitle"><label className="badge" style={{ margin: 0, color: '#000', borderRadius: 0 }}> Nov  1, 2024 </label> | Your service will not continue,if you not paid monthly bill</a>
                    &nbsp;&nbsp;&nbsp;
                </marquee>
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

                {/* <div className="col-md-3 p-2">
                    <div className="card">
                        <div className="card-body">
                            <span className="h5">
                                <CurrencyFormat value={staticReturnTotal} displayType={'text'} thousandSeparator={true} prefix={'$'} />
                            </span>
                            <p>Total Return</p>
                        </div>
                    </div>
                </div> */}
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
                            <span className="h6">Sales Analytics</span>
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

export default Dashboard;