import React, {Fragment, Suspense} from 'react';
import CompanyLayout from "../../../components/MasterLayout/CompanyLayout";
import LazyLoader from "../../../components/MasterLayout/LazyLoader";
import DesignationShow from "../../../components/Client/Designation/Show";

const DesignationShowPage = () => {
    return (
        <Fragment>
            <CompanyLayout>
                <Suspense fallback={<LazyLoader/>}>
                    <DesignationShow/>
                </Suspense>
            </CompanyLayout>
        </Fragment>
    );
};

export default DesignationShowPage;