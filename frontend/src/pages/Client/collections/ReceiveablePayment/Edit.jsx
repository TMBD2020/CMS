import React, {Fragment, Suspense} from 'react';
import CompanyLayout from "../../../../components/MasterLayout/CompanyLayout";
import LazyLoader from "../../../../components/MasterLayout/LazyLoader";
import ReceiveablePaymentEdit from "../../../../components/Client/collection/ReceiveablePayment/Edit";

const ReceiveablePaymentEditPage = () => {
    return (
        <Fragment>
            <CompanyLayout>
                <Suspense fallback={<LazyLoader/>}>
                    <ReceiveablePaymentEdit/>
                </Suspense>
            </CompanyLayout>
        </Fragment>
    );
};

export default ReceiveablePaymentEditPage;