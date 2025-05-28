import React, {Fragment, Suspense} from 'react';
import CompanyLayout from "../../../components/MasterLayout/CompanyLayout";
import LazyLoader from "../../../components/MasterLayout/LazyLoader";
import ProjectEdit from "../../../components/Client/Project/Edit";

const ProjectEditPage = () => {
    return (
        <Fragment>
            <CompanyLayout>
                <Suspense fallback={<LazyLoader/>}>
                    <ProjectEdit/>
                </Suspense>
            </CompanyLayout>
        </Fragment>
    );
};

export default ProjectEditPage;