import React, {Fragment, Suspense} from 'react';
import MasterLayout from "../../../components/MasterLayout/MasterLayout";
import LazyLoader from "../../../components/MasterLayout/LazyLoader";
import CompanyListPage from "../../../components/Super/Company/CompanyListPage";
const CompanyList = () => {
    return (
        <Fragment>
            <MasterLayout>
                <Suspense fallback={<LazyLoader/>}>
                    <CompanyListPage/>
                </Suspense>
            </MasterLayout>
        </Fragment>
    );
};

export default CompanyList;