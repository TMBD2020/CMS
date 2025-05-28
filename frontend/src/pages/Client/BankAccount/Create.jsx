import React, {Fragment, Suspense} from 'react';
import CompanyLayout from "../../../components/MasterLayout/CompanyLayout";
import LazyLoader from "../../../components/MasterLayout/LazyLoader";
import BankAccountCreate from "../../../components/Client/BankAccount/Create";

const BankAccountCreatePage = () => {
    return (
        <Fragment>
            <CompanyLayout>
                <Suspense fallback={<LazyLoader/>}>
                    <BankAccountCreate/>
                </Suspense>
            </CompanyLayout>
        </Fragment>
    );
};

export default BankAccountCreatePage;