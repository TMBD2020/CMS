import React, {Fragment, Suspense} from 'react';
import MasterLayout from "../../../components/MasterLayout/MasterLayout";
import LazyLoader from "../../../components/MasterLayout/LazyLoader";
import CompanyCreatePage from "../../../components/Super/Company/CompanyCreatePage";

const CompanyCreate = () => {
    return (
        <Fragment>
            <MasterLayout>
                <Suspense fallback={<LazyLoader/>}>
                    <CompanyCreatePage/>
                </Suspense>
            </MasterLayout>
        </Fragment>
    );
};

export default CompanyCreate;