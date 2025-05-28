import React, {Fragment,Suspense,lazy} from 'react';
import CompanyLayout from "../../components/MasterLayout/CompanyLayout";
import LazyLoader from "../../components/MasterLayout/LazyLoader";
const AdminDashboard =lazy(() => import('../../components/Dashboard/AdminDashboard'));
function AdminDashboardPage() {
  return (
    <Fragment>
    <CompanyLayout>
        <Suspense fallback={<LazyLoader/>}>
           <AdminDashboard/>
        </Suspense>
    </CompanyLayout>
</Fragment>
  )
}

export default AdminDashboardPage
