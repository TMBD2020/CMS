import React, {Fragment, Suspense} from 'react';
import CompanyLayout from "../../../components/MasterLayout/CompanyLayout";
import LazyLoader from "../../../components/MasterLayout/LazyLoader";
import BalanceTransferCreate from "../../../components/Client/balanceTransfer/Create";

const BankAccountCreatePage = () => {
    return (
        <Fragment>
            <CompanyLayout>
                <Suspense fallback={<LazyLoader/>}>
                    <BalanceTransferCreate/>
                </Suspense>
            </CompanyLayout>
        </Fragment>
    );
};

export default BankAccountCreatePage;