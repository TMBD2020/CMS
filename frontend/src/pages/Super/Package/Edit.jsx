import React, {Fragment, Suspense} from 'react';
import MasterLayout from "../../../components/MasterLayout/MasterLayout";
import LazyLoader from "../../../components/MasterLayout/LazyLoader";
import PackageEdit from "../../../components/Super/Package/Edit";

const PackageEditPage = () => {
    return (
        <Fragment>
            <MasterLayout>
                <Suspense fallback={<LazyLoader/>}>
                    <PackageEdit/>
                </Suspense>
            </MasterLayout>
        </Fragment>
    );
};

export default PackageEditPage;