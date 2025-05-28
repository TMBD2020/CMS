import React, {Fragment, Suspense} from 'react';
import CompanyLayout from "../../../components/MasterLayout/CompanyLayout";
import LazyLoader from "../../../components/MasterLayout/LazyLoader";
import PatnerEdit from "../../../components/Client/Patner/Edit";

const PatnerEditPage = () => {
    return (
        <Fragment>
            <CompanyLayout>
                <Suspense fallback={<LazyLoader/>}>
                    <PatnerEdit/>
                </Suspense>
            </CompanyLayout>
        </Fragment>
    );
};

export default PatnerEditPage;