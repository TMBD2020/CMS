import React, {Fragment, Suspense} from 'react';
import CompanyLayout from "../../../components/MasterLayout/CompanyLayout";
import LazyLoader from "../../../components/MasterLayout/LazyLoader";
import PatnerShow from "../../../components/Client/Patner/Show";

const PatnerShowPage = () => {
    return (
        <Fragment>
            <CompanyLayout>
                <Suspense fallback={<LazyLoader/>}>
                    <PatnerShow/>
                </Suspense>
            </CompanyLayout>
        </Fragment>
    );
};

export default PatnerShowPage;