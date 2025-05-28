import React, {Fragment, Suspense} from 'react';
import MasterLayout from "../../../components/MasterLayout/MasterLayout";
import LazyLoader from "../../../components/MasterLayout/LazyLoader";
import PaymentEdit from "../../../components/Super/Payment/Edit";

const PaymentEditPage = () => {
    return (
        <Fragment>
            <MasterLayout>
                <Suspense fallback={<LazyLoader/>}>
                    <PaymentEdit/>
                </Suspense>
            </MasterLayout>
        </Fragment>
    );
};

export default PaymentEditPage;