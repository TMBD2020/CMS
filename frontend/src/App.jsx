import React, { Fragment } from 'react';
import { getToken } from "./helper/SessionHelper";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
// Dashboard
import DashboardPage from "./pages/Dashboard/DashboardPage";
import SuperDashboardPage from "./pages/Dashboard/SuperDashboardPage";
import AdminDashboardPage from "./pages/Dashboard/AdminDashboardPage";
import PatnerDashboardPage from "./pages/Dashboard/PatnerDashboard";
import MemberDashboardPage from "./pages/Dashboard/MemberDashboardPage";
import EmployeeDashboardPage from "./pages/Dashboard/EmployeeDashboardPage";

import Page404 from "./pages/NotFound/Page404";
import FullscreenLoader from "./components/MasterLayout/FullscreenLoader";
import LoginPage from "./pages/Users/LoginPage";
import RegistrationPage from "./pages/Users/RegistrationPage";
import SendOTPPage from "./pages/Users/SendOTPPage";
import VerifyOTPPage from "./pages/Users/VerifyOTPPage";
import CreatePasswordPage from "./pages/Users/CreatePasswordPage";
import ProfilePage from "./pages/Users/ProfilePage";

import PurchaseReportPage from "./pages/Report/PurchaseReportPage";
import ReturnReportPage from "./pages/Report/ReturnReportPage";
import SaleReportPage from "./pages/Report/SaleReportPage";
import ExpenseReportPage from "./pages/Report/ExpenseReportPage";

//super
import CompanyCreatePage from "./pages/Super/Company/CompanyCreatePage";
import CompanyListPage from "./pages/Super/Company/CompanyListPage";
import CompanyEditPage from "./pages/Super/Company/CompanyEditPage";
import PackageCreatePage from "./pages/Super/Package/Create";
import PackageShowPage from "./pages/Super/Package/Show";
import PackageEditPage from "./pages/Super/Package/Edit";
import PaymentCreatePage from "./pages/Super/Payment/Create";
import PaymentShow from "./pages/Super/Payment/Show";
import PaymentEdit from "./pages/Super/Payment/Edit";
import NoticeCreatePage from "./pages/Super/Notice/Create";
import NoticeShow from "./pages/Super/Notice/Show";
import NoticeEdit from "./pages/Super/Notice/Edit";
//client
import MemberCreatePage from "./pages/Client/Member/Create";
import MemberShow from "./pages/Client/Member/Show";
import MemberEdit from "./pages/Client/Member/Edit";

import ProjectCreatePage from "./pages/Client/Project/Create";
import Projectshow from "./pages/Client/Project/Show";
import ProjectEdit from "./pages/Client/Project/Edit";

import ClientNoticeCreatePage from "./pages/Client/Notice/Create";
import ClientNoticeShow from "./pages/Client/Notice/Show";
import ClientNoticeEdit from "./pages/Client/Notice/Edit";

import BankAccountCreatePage from "./pages/Client/BankAccount/Create";
import BankAccountShow from "./pages/Client/BankAccount/Show";
import BankAccountEdit from "./pages/Client/BankAccount/Edit";

import BalanceTransferCreatePage from "./pages/Client/balanceTransfer/Create";
import BalanceTransferShow from "./pages/Client/balanceTransfer/Show";
import BalanceTransferEdit from "./pages/Client/balanceTransfer/Edit";

import DesignationCreatePage from "./pages/Client/Designation/Create";
import DesignationShow from "./pages/Client/Designation/Show";
import DesignationEdit from "./pages/Client/Designation/Edit";

import EmployeeCreatePage from "./pages/Client/Employee/Create";
import EmployeeShow from "./pages/Client/Employee/Show";
import EmployeeEdit from "./pages/Client/Employee/Edit";

import PermissionCreatePage from "./pages/Super/Permission/Create";
import PermissionShow from "./pages/Super/Permission/Show";
import PermissionEdit from "./pages/Super/Permission/Edit";

import PatnerCreatePage from "./pages/Client/Patner/Create";
import PatnerShow from "./pages/Client/Patner/Show";                
import PatnerEdit from "./pages/Client/Patner/Edit";

import ReceiveablePaymentCreatePage from "./pages/Client/collections/ReceiveablePayment/Create.jsx";
import ReceiveablePaymentShow from "./pages/Client/collections/ReceiveablePayment/Show";                
import ReceiveablePaymentEdit from "./pages/Client/collections/ReceiveablePayment/Edit";

import ProtectedRoute from "./components/Layout/ProtectedRoute.jsx";
import './dashboard.css';
const App = () => {

    if (getToken()) {
        return (
            <Fragment>
                <BrowserRouter>
                    <Routes>
                        {/* Dashboard */}
                        <Route
                            path="/super"
                            element={
                                // <ProtectedRoute role="super">
                                    <SuperDashboardPage />
                                //  </ProtectedRoute>
                            }
                        />

                        {/* <Route exact path="/" element={<DashboardPage />} /> */}
                        {/* <Route exact path="/super" element={<SuperDashboardPage />} /> */}
                        <Route exact path="/client" element={<AdminDashboardPage />} />
                        <Route exact path="/patner" element={<PatnerDashboardPage />} />
                        <Route exact path="/member" element={<MemberDashboardPage />} />
                        <Route exact path="/employee" element={<EmployeeDashboardPage />} />


                        {/* Super Route*/}
                        {/* Package */}
                        <Route exact path="/package/create" element={<PackageCreatePage />} />
                        <Route exact path="/package/list" element={<PackageShowPage />} />
                        <Route exact path="/package/edit/:id" element={<PackageEditPage />} />
                         {/* Payments */}
                         <Route exact path="/payments/create" element={<PaymentCreatePage />} />
                         <Route exact path="/payments/show" element={<PaymentShow />} />
                         <Route exact path="/payments/edit/:id" element={<PaymentEdit />} />
                        {/* Company */}
                        <Route exact path="/company/create" element={<CompanyCreatePage />} />
                        <Route exact path="/company/list" element={<CompanyListPage />} />
                        <Route exact path="/company/edit/:id" element={<CompanyEditPage />} />
                        {/* Notice */}
                        <Route exact path="/notice/create" element={<NoticeCreatePage />} />
                        <Route exact path="/notice/list" element={<NoticeShow />} />
                        <Route exact path="/notice/edit/:id" element={<NoticeEdit />} />
                        {/* Permission */}
                        <Route exact path="/roles" element={<PermissionCreatePage />} />
                        <Route exact path="/permission/list" element={<PermissionShow />} />
                        <Route exact path="/permission/detail/:id" element={<PermissionEdit />} />
                        {/* Super end */}

                        {/* Client Route*/}
                        {/* member */}
                        <Route exact path="/member/create" element={<MemberCreatePage />} />
                        <Route exact path="/member/list" element={<MemberShow />} />
                        <Route exact path="/member/edit/:id" element={<MemberEdit />} />
                        {/* Project */}
                        <Route exact path="/project/create" element={<ProjectCreatePage />} />
                        <Route exact path="/project/list" element={<Projectshow />} />
                        <Route exact path="/project/edit/:id" element={<ProjectEdit />} />
                         {/* Bank account */}
                        <Route exact path="/bank-accounts/create" element={<BankAccountCreatePage />} />
                        <Route exact path="/bank-accounts/list" element={<BankAccountShow />} />
                        <Route exact path="/bank-accounts/details/:id" element={<BankAccountEdit />} />
                        {/* Notice */}
                        <Route exact path="/notices/create" element={<ClientNoticeCreatePage />} />
                        <Route exact path="/notices/list" element={<ClientNoticeShow />} />
                        <Route exact path="/notices/details/:id" element={<ClientNoticeEdit />} />
                        {/* Bank Transfer */}
                        <Route exact path="/balance-transfers/create" element={<BalanceTransferCreatePage />} />
                        <Route exact path="/balance-transfers/list" element={<BalanceTransferShow />} />
                        <Route exact path="/balance-transfers/details/:id" element={<BalanceTransferEdit />} />
                         {/* Designation */}
                        <Route exact path="/designation/create" element={<DesignationCreatePage />} />
                        <Route exact path="/designation/list" element={<DesignationShow />} />
                        <Route exact path="/designation/details/:id" element={<DesignationEdit />} />
                         {/* Employee */}
                        <Route exact path="/employee/create" element={<EmployeeCreatePage />} />
                        <Route exact path="/employee/list" element={<EmployeeShow />} />
                        <Route exact path="/employee/details/:id" element={<EmployeeEdit />} />
                        {/* Patner */}
                        <Route exact path="/patner/create" element={<PatnerCreatePage />} />
                        <Route exact path="/patner/list" element={<PatnerShow />} />
                        <Route exact path="/patner/details/:id" element={<PatnerEdit />} />
                        {/* ReceiveablePayment */}
                        <Route exact path="/receiveable-payment/create" element={<ReceiveablePaymentCreatePage />} />
                        <Route exact path="/receiveable-payment/list" element={<ReceiveablePaymentShow />} />
                        <Route exact path="/receiveable-payment/details/:id" element={<ReceiveablePaymentEdit />} />

                        <Route exact path="/PurchaseReportPage" element={<PurchaseReportPage />} />
                        <Route exact path="/ReturnReportPage" element={<ReturnReportPage />} />
                        <Route exact path="/SaleReportPage" element={<SaleReportPage />} />
                        <Route exact path="/ExpenseReportPage" element={<ExpenseReportPage />} />


                        {/* Dashboard Routes */} 
                        {/* <Route path="/Super" element={ <ProtectedRoute> <SuperDashboardPage /> </ProtectedRoute> } /> 
                        <Route path="/Admin" element={ <ProtectedRoute> <AdminDashboardPage /> </ProtectedRoute> } /> 
                        <Route path="/" element={ <ProtectedRoute> <DashboardPage /> </ProtectedRoute> } /> */}


                        <Route exact path="/Profile" element={<ProfilePage />} />
                        <Route path="*" element={<Page404 />} />
                    </Routes>
                </BrowserRouter>
                <FullscreenLoader />
                <FullscreenLoader />
            </Fragment>
        );
    }
    else {
        return (
            <Fragment>
                <BrowserRouter>
                    <Routes>
                        <Route path="/" element={<Navigate to="/Login" replace />} />
                        <Route exact path="/login" element={<LoginPage />} />
                        <Route exact path="/registration" element={<RegistrationPage />} />
                        <Route exact path="/sendOTP" element={<SendOTPPage />} />
                        <Route exact path="/verifyOTP" element={<VerifyOTPPage />} />
                        <Route exact path="/createPassword" element={<CreatePasswordPage />} />
                        <Route path="*" element={<Page404 />} />
                    </Routes>
                </BrowserRouter>
                <FullscreenLoader />
                <FullscreenLoader />
            </Fragment>
        );
    }
};
export default App;