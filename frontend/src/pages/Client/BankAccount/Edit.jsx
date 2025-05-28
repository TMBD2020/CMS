import React, {Fragment, Suspense} from 'react';
import CompanyLayout from "../../../components/MasterLayout/CompanyLayout";
import LazyLoader from "../../../components/MasterLayout/LazyLoader";
import BankAccountEdit from "../../../components/Client/BankAccount/Edit";

const BankAccountEditPage = () => {
    return (
        <Fragment>
            <CompanyLayout>
                <Suspense fallback={<LazyLoader/>}>
                    <BankAccountEdit/>
                </Suspense>
            </CompanyLayout>
        </Fragment>
    );
};

export default BankAccountEditPage;