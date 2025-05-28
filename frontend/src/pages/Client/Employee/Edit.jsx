import React, {Fragment, Suspense} from 'react';
import CompanyLayout from "../../../components/MasterLayout/CompanyLayout";
import LazyLoader from "../../../components/MasterLayout/LazyLoader";
import EmployeeEdit from "../../../components/Client/Employee/Edit";

const EmployeeEditPage = () => {
    return (
        <Fragment>
            <CompanyLayout>
                <Suspense fallback={<LazyLoader/>}>
                    <EmployeeEdit/>
                </Suspense>
            </CompanyLayout>
        </Fragment>
    );
};

export default EmployeeEditPage;