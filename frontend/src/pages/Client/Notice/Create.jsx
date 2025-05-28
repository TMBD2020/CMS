import React, {Fragment, Suspense} from 'react';
import CompanyLayout from "../../../components/MasterLayout/CompanyLayout";
import LazyLoader from "../../../components/MasterLayout/LazyLoader";
import NoticeCreate from "../../../components/Client/Notice/Create";

const NoticeCreatePage = () => {
    return (
        <Fragment>
            <CompanyLayout>
                <Suspense fallback={<LazyLoader/>}>
                    <NoticeCreate/>
                </Suspense>
            </CompanyLayout>
        </Fragment>
    );
};

export default NoticeCreatePage;