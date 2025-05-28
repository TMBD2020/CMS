import React, {Fragment, Suspense} from 'react';
import CompanyLayout from "../../../../components/MasterLayout/CompanyLayout";
import LazyLoader from "../../../../components/MasterLayout/LazyLoader";
import ReceiveablePaymentCreate from "../../../../components/Client/collection/ReceiveablePayment/Create";

const ReceiveablePaymentCreatePage = () => {
    return (
        <Fragment>
            <CompanyLayout>
                <Suspense fallback={<LazyLoader/>}>
                    <ReceiveablePaymentCreate/>
                </Suspense>
            </CompanyLayout>
        </Fragment>
    );
};

export default ReceiveablePaymentCreatePage;