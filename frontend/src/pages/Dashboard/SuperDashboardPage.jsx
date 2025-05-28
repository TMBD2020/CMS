import React, {Fragment,Suspense,lazy} from 'react';
import MasterLayout from "../../components/MasterLayout/MasterLayout";
import LazyLoader from "../../components/MasterLayout/LazyLoader";
const SuperDashboard =lazy(() => import('../../components/Dashboard/SuperDashboard'));
function SuperDashboardPage() {
  return (
    <Fragment>
    <MasterLayout>
        <Suspense fallback={<LazyLoader/>}>
            <SuperDashboard/>
        </Suspense>
    </MasterLayout>
</Fragment>
  )
}

export default SuperDashboardPage
