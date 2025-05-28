import React, {Fragment, Suspense} from 'react';
import CompanyLayout from "../../../components/MasterLayout/CompanyLayout";
import LazyLoader from "../../../components/MasterLayout/LazyLoader";
import MemberCreate from "../../../components/Client/Member/Create";

const MemberCreatePage = () => {
    return (
        <Fragment>
            <CompanyLayout>
                <Suspense fallback={<LazyLoader/>}>
                    <MemberCreate/>
                </Suspense>
            </CompanyLayout>
        </Fragment>
    );
};

export default MemberCreatePage;