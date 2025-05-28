import React, {Fragment, Suspense} from 'react';
import CompanyLayout from "../../../components/MasterLayout/CompanyLayout";
import LazyLoader from "../../../components/MasterLayout/LazyLoader";
import BalanceTransferEdit from "../../../components/Client/balanceTransfer/Edit";

const BalanceTransferEditPage = () => {
    return (
        <Fragment>
            <CompanyLayout>
                <Suspense fallback={<LazyLoader/>}>
                    <BalanceTransferEdit/>
                </Suspense>
            </CompanyLayout>
        </Fragment>
    );
};

export default BalanceTransferEditPage;