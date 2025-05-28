import React, {Fragment, Suspense} from 'react';
import MasterLayout from "../../../components/MasterLayout/MasterLayout";
import LazyLoader from "../../../components/MasterLayout/LazyLoader";
import NoticeShow from "../../../components/Super/Notice/Show";

const NoticeShowPage = () => {
    return (
        <Fragment>
            <MasterLayout>
                <Suspense fallback={<LazyLoader/>}>
                    <NoticeShow/>
                </Suspense>
            </MasterLayout>
        </Fragment>
    );
};

export default NoticeShowPage;