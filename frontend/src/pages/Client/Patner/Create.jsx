import React, {Fragment, Suspense} from 'react';
import CompanyLayout from "../../../components/MasterLayout/CompanyLayout";
import LazyLoader from "../../../components/MasterLayout/LazyLoader";
import PatnerCreate from "../../../components/Client/Patner/Create";

const PatnerCreatePage = () => {
    return (
        <Fragment>
            <CompanyLayout>
                <Suspense fallback={<LazyLoader/>}>
                    <PatnerCreate/>
                </Suspense>
            </CompanyLayout>
        </Fragment>
    );
};

export default PatnerCreatePage;