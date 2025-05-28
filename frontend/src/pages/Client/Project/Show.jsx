import React, {Fragment, Suspense} from 'react';
import CompanyLayout from "../../../components/MasterLayout/CompanyLayout";
import LazyLoader from "../../../components/MasterLayout/LazyLoader";
import ProjectShow from "../../../components/Client/Project/Show";

const ProjectShowPage = () => {
    return (
        <Fragment>
            <CompanyLayout>
                <Suspense fallback={<LazyLoader/>}>
                    <ProjectShow/>
                </Suspense>
            </CompanyLayout>
        </Fragment>
    );
};

export default ProjectShowPage;