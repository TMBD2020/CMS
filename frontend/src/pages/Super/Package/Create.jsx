import React, {Fragment, Suspense} from 'react';
import MasterLayout from "../../../components/MasterLayout/MasterLayout";
import LazyLoader from "../../../components/MasterLayout/LazyLoader";
import PackageCreate from "../../../components/Super/Package/Create";

const PackageCreatePage = () => {
    return (
        <Fragment>
            <MasterLayout>
                <Suspense fallback={<LazyLoader/>}>
                    <PackageCreate/>
                </Suspense>
            </MasterLayout>
        </Fragment>
    );
};

export default PackageCreatePage;