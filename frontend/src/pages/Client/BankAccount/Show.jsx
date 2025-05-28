import React, {Fragment, Suspense} from 'react';
import CompanyLayout from "../../../components/MasterLayout/CompanyLayout";
import LazyLoader from "../../../components/MasterLayout/LazyLoader";
import BankAccountShow from "../../../components/Client/BankAccount/Show";

const NoticeShowPage = () => {
    return (
        <Fragment>
            <CompanyLayout>
                <Suspense fallback={<LazyLoader/>}>
                    <BankAccountShow/>
                </Suspense>
            </CompanyLayout>
        </Fragment>
    );
};

export default NoticeShowPage;