import React, {Fragment, Suspense} from 'react';
import CompanyLayout from "../../../components/MasterLayout/CompanyLayout";
import LazyLoader from "../../../components/MasterLayout/LazyLoader";
import EmployeeShow from "../../../components/Client/Employee/Show";

const EmployeeShowPage = () => {
    return (
        <Fragment>
            <CompanyLayout>
                <Suspense fallback={<LazyLoader/>}>
                    <EmployeeShow/>
                </Suspense>
            </CompanyLayout>
        </Fragment>
    );
};

export default EmployeeShowPage;