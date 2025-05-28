import React, {Fragment, Suspense} from 'react';
import CompanyLayout from "../../../components/MasterLayout/CompanyLayout";
import LazyLoader from "../../../components/MasterLayout/LazyLoader";
import NoticeEdit from "../../../components/Client/Notice/Edit";

const NoticeEditPage = () => {
    return (
        <Fragment>
            <CompanyLayout>
                <Suspense fallback={<LazyLoader/>}>
                    <NoticeEdit/>
                </Suspense>
            </CompanyLayout>
        </Fragment>
    );
};

export default NoticeEditPage;