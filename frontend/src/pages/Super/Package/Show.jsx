import React, {Fragment, Suspense} from 'react';
import MasterLayout from "../../../components/MasterLayout/MasterLayout";
import LazyLoader from "../../../components/MasterLayout/LazyLoader";
import PackageShow from "../../../components/Super/Package/Show";

const PackageShowPage = () => {
    return (
        <Fragment>
            <MasterLayout>
                <Suspense fallback={<LazyLoader/>}>
                    <PackageShow/>
                </Suspense>
            </MasterLayout>
        </Fragment>
    );
};

export default PackageShowPage;