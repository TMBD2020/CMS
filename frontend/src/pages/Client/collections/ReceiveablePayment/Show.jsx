import React, {Fragment, Suspense} from 'react';
import CompanyLayout from "../../../../components/MasterLayout/CompanyLayout";
import LazyLoader from "../../../../components/MasterLayout/LazyLoader";
import ReceiveablePaymentShow from "../../../../components/Client/collection/ReceiveablePayment/Show";

const ReceiveablePaymentShowPage = () => {
    return (
        <Fragment>
            <CompanyLayout>
                <Suspense fallback={<LazyLoader/>}>
                    <ReceiveablePaymentShow/>
                </Suspense>
            </CompanyLayout>
        </Fragment>
    );
};

export default ReceiveablePaymentShowPage;