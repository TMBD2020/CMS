import React, {Fragment, Suspense} from 'react';
import MasterLayout from "../../../components/MasterLayout/MasterLayout";
import LazyLoader from "../../../components/MasterLayout/LazyLoader";
import PermissionCreate from "../../../components/Super/Permission/Create";

const PermissionCreatePage = () => {
    return (
        <Fragment>
            <MasterLayout>
                <Suspense fallback={<LazyLoader/>}>
                    <PermissionCreate/>
                </Suspense>
            </MasterLayout>
        </Fragment>
    );
};

export default PermissionCreatePage;