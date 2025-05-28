import React, {Fragment, Suspense} from 'react';
import CompanyLayout from "../../../components/MasterLayout/CompanyLayout";
import LazyLoader from "../../../components/MasterLayout/LazyLoader";
import NoticeShow from "../../../components/Client/Notice/Show";

const NoticeShowPage = () => {
    return (
        <Fragment>
            <CompanyLayout>
                <Suspense fallback={<LazyLoader/>}>
                    <NoticeShow/>
                </Suspense>
            </CompanyLayout>
        </Fragment>
    );
};

export default NoticeShowPage;