import React, {Fragment,Suspense,lazy} from 'react';
import EmployeeLayout from "../../components/MasterLayout/EmployeeLayout";
import LazyLoader from "../../components/MasterLayout/LazyLoader";
const EmployeeDashboard =lazy(() => import('../../components/Dashboard/EmployeeDashboard'));
function EmployeeDashboardPage() {
  return (
    <Fragment>
    <EmployeeLayout>
        <Suspense fallback={<LazyLoader/>}>
            <EmployeeDashboard/>
        </Suspense>
    </EmployeeLayout>
</Fragment>
  )
}

export default EmployeeDashboardPage
