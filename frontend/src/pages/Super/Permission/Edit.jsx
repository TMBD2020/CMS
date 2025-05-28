import React, {Fragment, Suspense} from 'react';
import MasterLayout from "../../../components/MasterLayout/MasterLayout";
import LazyLoader from "../../../components/MasterLayout/LazyLoader";
import PermissionEdit from "../../../components/Super/Permission/Edit";

const PermissionEditPage = () => {
    return (
        <Fragment>
            <MasterLayout>
                <Suspense fallback={<LazyLoader/>}>
                    <PermissionEdit/>
                </Suspense>
            </MasterLayout>
        </Fragment>
    );
};

export default PermissionEditPage;