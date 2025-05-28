import React, {Fragment, Suspense} from 'react';
import CompanyLayout from "../../../components/MasterLayout/CompanyLayout";
import LazyLoader from "../../../components/MasterLayout/LazyLoader";
import MemberShow from "../../../components/Client/Member/Show";

const MemberShowPage = () => {
    return (
        <Fragment>
            <CompanyLayout>
                <Suspense fallback={<LazyLoader/>}>
                    <MemberShow/>
                </Suspense>
            </CompanyLayout>
        </Fragment>
    );
};

export default MemberShowPage;