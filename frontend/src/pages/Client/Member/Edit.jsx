import React, {Fragment, Suspense} from 'react';
import CompanyLayout from "../../../components/MasterLayout/CompanyLayout";
import LazyLoader from "../../../components/MasterLayout/LazyLoader";
import MemberEdit from "../../../components/Client/Member/Edit";

const MemberEditPage = () => {
    return (
        <Fragment>
            <CompanyLayout>
                <Suspense fallback={<LazyLoader/>}>
                    <MemberEdit/>
                </Suspense>
            </CompanyLayout>
        </Fragment>
    );
};

export default MemberEditPage;