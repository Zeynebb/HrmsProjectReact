import React from 'react'
import { Route } from 'react-router'
import CvList from '../pages/cv/CvList'
import CvEducationInformationList from '../pages/cvEducationInformation/CvEducationInformationList'
import JobAdvertisementList from '../pages/jobAdvertisement/JobAdvertisementList'
import EmployerRegister from '../navi/register/EmployerRegister'
import JobSeekerRegister from '../navi/register/JobSeekerRegister'
import JobAdvertisementDetails from '../pages/jobAdvertisement/JobAdvertisementDetails'
import TechnologyAdd from '../pages/cvTechnologies/TechnologyAdd'
import Login from '../pages/login/Login'
import JobAdvertisementAdd from '../pages/jobAdvertisement/JobAdvertisementAdd'
import JobAdvertisementListForEmployer from '../pages/jobAdvertisement/JobAdvertisementListForEmployer'
import JobAdvertisementDetailForEmployer from '../pages/jobAdvertisement/JobAdvertisementDetailForEmployer'
import ActiveJobAdvertisementListForEmployer from '../pages/jobAdvertisement/ActiveJobAdvertisementListForEmployer'
import PassiveJobAdvertisementListForEmployer from '../pages/jobAdvertisement/PassiveJobAdvertisementListForEmployer'
import EmployerDetail from '../pages/employers/EmployerDetail'
import ApprovedEmployerList from '../pages/systemPersonnels/ApprovedEmployerList'
import UnApprovedEmployerList from '../pages/systemPersonnels/UnApprovedEmployerList'
import ApprovedJobAdvertisementList from '../pages/systemPersonnels/ApprovedJobAdvertisementList'
import UnApprovedJobAdvertisementList from '../pages/systemPersonnels/UnApprovedJobAdvertisementList'
import CvPhotos from '../pages/cvPhotos/CvPhotos'
import JobAdvertisementDetailsForPersonnel from '../pages/jobAdvertisement/JobAdvertisementDetailsForPersonnel'
import Cvs from '../pages/cv/Cvs'

export default function MainLayout() {
    return (
        <div >
            <Route exact path="/jobAdvertisement" component={JobAdvertisementList} />
            <Route exact path="/jobAdvertisementAdd" component={JobAdvertisementAdd} />
            <Route exact path="/jobAdvertisement/:jobAdvertisementId" component={JobAdvertisementDetails} />
            <Route exact path="/jobAdvertisementForEmployer/:employerId" component={JobAdvertisementListForEmployer} />
            <Route exact path="/activeJobAdvertisement/:employerId" component={ActiveJobAdvertisementListForEmployer} />
            <Route exact path="/passiveJobAdvertisement/:employerId" component={PassiveJobAdvertisementListForEmployer} />
            <Route exact path="/jobAdvertisementDetailForEmployer/:jobAdvertisementId" component={JobAdvertisementDetailForEmployer} />
            <Route exact path="/jobAdvertisementDetailForPersonnel/:jobAdvertisementId" component={JobAdvertisementDetailsForPersonnel} />
            <Route exact path="/approvedJobAdvertisement" component={ApprovedJobAdvertisementList} />
            <Route exact path="/unApprovedJobAdvertisement" component={UnApprovedJobAdvertisementList} />

            <Route exact path="/employerDetails/:employerId" component={EmployerDetail} />
            <Route exact path="/employerRegister" component={EmployerRegister} />
            <Route exact path="/approvedEmployerList" component={ApprovedEmployerList} />
            <Route exact path="/unApprovedEmployerList" component={UnApprovedEmployerList} />

            <Route exact path="/jobSeekerRegister" component={JobSeekerRegister} />
            <Route exact path="/technologyAdd" component={TechnologyAdd} />
            <Route exact path="/cv/:cvId" component={CvList} />
            <Route exact path="/cv" component={CvList} />
            <Route exact path="/cvPhoto/:cvId" component={CvPhotos} />
            
            <Route exact path="/cvs/:jobSeekerId" component={Cvs} />

            <Route exact path="/login" component={Login} />
        </div>
    )
}
