import React, {Fragment, Suspense} from 'react';
import MasterLayout from "../../../components/MasterLayout/MasterLayout";
import LazyLoader from "../../../components/MasterLayout/LazyLoader";
import CompanyEdit from "../../../components/Super/Company/CompanyEditPage";

const CompanyEditPage = () => {
    return (
        <Fragment>
            <MasterLayout>
                <Suspense fallback={<LazyLoader/>}>
                    <CompanyEdit/>
                </Suspense>
            </MasterLayout>
        </Fragment>
    );
};

export default CompanyEditPage;