import React, {Fragment,Suspense,lazy} from 'react';
import MemberLayout from "../../components/MasterLayout/MemberLayout";
import LazyLoader from "../../components/MasterLayout/LazyLoader";
const MemberDashboard =lazy(() => import('../../components/Dashboard/MemberDashboard'));
function MemberDashboardPage() {
  return (
    <Fragment>
    <MemberLayout>
        <Suspense fallback={<LazyLoader/>}>
            <MemberDashboard/>
        </Suspense>
    </MemberLayout>
</Fragment>
  )
}

export default MemberDashboardPage
