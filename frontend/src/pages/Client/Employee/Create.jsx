import React, {Fragment, Suspense} from 'react';
import CompanyLayout from "../../../components/MasterLayout/CompanyLayout";
import LazyLoader from "../../../components/MasterLayout/LazyLoader";
import EmployeeCreate from "../../../components/Client/Employee/Create";

const EmployeeCreatePage = () => {
    return (
        <Fragment>
            <CompanyLayout>
                <Suspense fallback={<LazyLoader/>}>
                    <EmployeeCreate/>
                </Suspense>
            </CompanyLayout>
        </Fragment>
    );
};

export default EmployeeCreatePage;