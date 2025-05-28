import React, {Fragment,Suspense,lazy} from 'react';
import PatnerLayout from "../../components/MasterLayout/PatnerLayout";
import LazyLoader from "../../components/MasterLayout/LazyLoader";
const PatnerDashboard =lazy(() => import('../../components/Dashboard/PatnerDashboard'));
function PatnerDashboardPage() {
  return (
    <Fragment>
    <PatnerLayout>
        <Suspense fallback={<LazyLoader/>}>
            <PatnerDashboard/>
        </Suspense>
    </PatnerLayout>
</Fragment>
  )
}

export default PatnerDashboardPage
