import React, {Fragment, Suspense} from 'react';
import MasterLayout from "../../../components/MasterLayout/MasterLayout";
import LazyLoader from "../../../components/MasterLayout/LazyLoader";
import NoticeEdit from "../../../components/Super/Notice/Edit";

const NoticeEditPage = () => {
    return (
        <Fragment>
            <MasterLayout>
                <Suspense fallback={<LazyLoader/>}>
                    <NoticeEdit/>
                </Suspense>
            </MasterLayout>
        </Fragment>
    );
};

export default NoticeEditPage;