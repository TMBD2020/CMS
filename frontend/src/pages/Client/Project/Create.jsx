import React, {Fragment, Suspense} from 'react';
import CompanyLayout from "../../../components/MasterLayout/CompanyLayout";
import LazyLoader from "../../../components/MasterLayout/LazyLoader";
import ProjectCreate from "../../../components/Client/Project/Create";

const ProjectCreatePage = () => {
    return (
        <Fragment>
            <CompanyLayout>
                <Suspense fallback={<LazyLoader/>}>
                    <ProjectCreate/>
                </Suspense>
            </CompanyLayout>
        </Fragment>
    );
};

export default ProjectCreatePage;