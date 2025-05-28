import React, {Fragment, Suspense} from 'react';
import MasterLayout from "../../../components/MasterLayout/MasterLayout";
import LazyLoader from "../../../components/MasterLayout/LazyLoader";
import PaymentShow from "../../../components/Super/Payment/Show";

const PaymentShowPage = () => {
    return (
        <Fragment>
            <MasterLayout>
                <Suspense fallback={<LazyLoader/>}>
                    <PaymentShow/>
                </Suspense>
            </MasterLayout>
        </Fragment>
    );
};

export default PaymentShowPage;