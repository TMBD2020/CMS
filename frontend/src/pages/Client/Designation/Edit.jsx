import React, {Fragment, Suspense} from 'react';
import CompanyLayout from "../../../components/MasterLayout/CompanyLayout";
import LazyLoader from "../../../components/MasterLayout/LazyLoader";
import DesignationEdit from "../../../components/Client/Designation/Edit";

const DesignationEditPage = () => {
    return (
        <Fragment>
            <CompanyLayout>
                <Suspense fallback={<LazyLoader/>}>
                    <DesignationEdit/>
                </Suspense>
            </CompanyLayout>
        </Fragment>
    );
};

export default DesignationEditPage;