import React, {Fragment, Suspense} from 'react';
import MasterLayout from "../../../components/MasterLayout/MasterLayout";
import LazyLoader from "../../../components/MasterLayout/LazyLoader";
import PermissionShow from "../../../components/Super/Permission/Show";

const PermissionShowPage = () => {
    return (
        <Fragment>
            <MasterLayout>
                <Suspense fallback={<LazyLoader/>}>
                    <PermissionShow/>
                </Suspense>
            </MasterLayout>
        </Fragment>
    );
};

export default PermissionShowPage;