import React, {Fragment, Suspense} from 'react';
import MasterLayout from "../../../components/MasterLayout/MasterLayout";
import LazyLoader from "../../../components/MasterLayout/LazyLoader";
import NoticeCreate from "../../../components/Super/Notice/Create";

const NoticeCreatePage = () => {
    return (
        <Fragment>
            <MasterLayout>
                <Suspense fallback={<LazyLoader/>}>
                    <NoticeCreate/>
                </Suspense>
            </MasterLayout>
        </Fragment>
    );
};

export default NoticeCreatePage;