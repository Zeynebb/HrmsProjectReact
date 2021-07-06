import React from 'react'
import { Route } from 'react-router'
import CvList from '../pages/cv/CvList'
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
import EmployerProfile from '../pages/employers/EmployerProfile'
import ApprovedEmployerList from '../pages/systemPersonnels/ApprovedEmployerList'
import UnApprovedEmployerList from '../pages/systemPersonnels/UnApprovedEmployerList'
import ApprovedJobAdvertisementList from '../pages/systemPersonnels/ApprovedJobAdvertisementList'
import UnApprovedJobAdvertisementList from '../pages/systemPersonnels/UnApprovedJobAdvertisementList'
import JobAdvertisementDetailsForPersonnel from '../pages/jobAdvertisement/JobAdvertisementDetailsForPersonnel'
import Cvs from '../pages/cv/Cvs'
import CvAdd from '../pages/cv/CvAdd'
import JobSeekerDetail from '../pages/jobSeekers/JobSeekerDetail'
import SystemPersonnelProfile from '../pages/systemPersonnels/SystemPersonnelProfile'
import SystemPersonnelProfileUpdate from '../pages/systemPersonnels/SystemPersonnelProfileUpdate'
import BaseProfilePage from '../pages/profile/BaseProfilePage'
import UpdatedEmployerList from '../pages/systemPersonnels/UpdatedEmployerList'
import UpdatedEmployerListApproval from '../pages/systemPersonnels/UpdatedEmployerListApproval'

export default function MainLayout() {
    return (
        <div >
            <Route exact path="/:userId/jobAdvertisement" component={JobAdvertisementList} />
            <Route exact path="/jobAdvertisementAdd" component={JobAdvertisementAdd} />
            <Route exact path="/:userId/jobAdvertisement/:jobAdvertisementId" component={JobAdvertisementDetails} />
            <Route exact path="/jobAdvertisementForEmployer/:userId" component={JobAdvertisementListForEmployer} />
            <Route exact path="/activeJobAdvertisement/:userId" component={ActiveJobAdvertisementListForEmployer} />
            <Route exact path="/passiveJobAdvertisement/:userId" component={PassiveJobAdvertisementListForEmployer} />
            <Route exact path="/:userId/jobAdvertisementDetailForEmployer/:jobAdvertisementId" component={JobAdvertisementDetailForEmployer} />
            <Route exact path="/jobAdvertisementDetailForPersonnel/:jobAdvertisementId" component={JobAdvertisementDetailsForPersonnel} />
            <Route exact path="/approvedJobAdvertisement" component={ApprovedJobAdvertisementList} />
            <Route exact path="/unApprovedJobAdvertisement" component={UnApprovedJobAdvertisementList} />

            <Route exact path="/profile/:userId" component={BaseProfilePage} />
            
            <Route exact path="/employerDetails/:userId" component={EmployerProfile} />
            <Route exact path="/employerRegister" component={EmployerRegister} />
            <Route exact path="/approvedEmployerList" component={ApprovedEmployerList} />
            <Route exact path="/unApprovedEmployerList" component={UnApprovedEmployerList} />
            <Route exact path="/updatedEmployerList" component={UpdatedEmployerList} />
            <Route exact path="/updatedEmployerListApproval/:userId" component={UpdatedEmployerListApproval} />


            <Route exact path="/jobSeekerRegister" component={JobSeekerRegister} />
            <Route exact path="/jobSeekerDetails/:userId" component={JobSeekerDetail} />

            <Route exact path="/technologyAdd" component={TechnologyAdd} />
            
            <Route exact path="/cvs/:userId/cvUpdate/:cvId" component={CvAdd} />
            <Route exact path="/cvs/:userId/cv/:cvId" component={CvList} />
            <Route exact path="/cvs/:userId" component={Cvs} />

            <Route exact path="/login" component={Login} />
        </div>
    )
}
