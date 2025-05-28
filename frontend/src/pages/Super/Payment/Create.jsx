import React, {Fragment, Suspense} from 'react';
import MasterLayout from "../../../components/MasterLayout/MasterLayout";
import LazyLoader from "../../../components/MasterLayout/LazyLoader";
import PaymentCreate from "../../../components/Super/Payment/Create";

const PaymentCreatePage = () => {
    return (
        <Fragment>
            <MasterLayout>
                <Suspense fallback={<LazyLoader/>}>
                    <PaymentCreate/>
                </Suspense>
            </MasterLayout>
        </Fragment>
    );
};

export default PaymentCreatePage;