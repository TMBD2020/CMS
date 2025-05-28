import React, {Fragment, Suspense} from 'react';
import CompanyLayout from "../../../components/MasterLayout/CompanyLayout";
import LazyLoader from "../../../components/MasterLayout/LazyLoader";
import DesignationCreate from "../../../components/Client/Designation/Create";

const DesignationCreatePage = () => {
    return (
        <Fragment>
            <CompanyLayout>
                <Suspense fallback={<LazyLoader/>}>
                    <DesignationCreate/>
                </Suspense>
            </CompanyLayout>
        </Fragment>
    );
};

export default DesignationCreatePage;