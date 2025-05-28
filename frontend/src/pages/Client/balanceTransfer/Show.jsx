import React, {Fragment, Suspense} from 'react';
import CompanyLayout from "../../../components/MasterLayout/CompanyLayout";
import LazyLoader from "../../../components/MasterLayout/LazyLoader";
import BalanceTransferShow from "../../../components/Client/balanceTransfer/Show";

const BalanceTransferShowPage = () => {
    return (
        <Fragment>
            <CompanyLayout>
                <Suspense fallback={<LazyLoader/>}>
                    <BalanceTransferShow/>
                </Suspense>
            </CompanyLayout>
        </Fragment>
    );
};

export default BalanceTransferShowPage;