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

export default function MainLayout() {
    return (<div >
        <Route exact path="/cv" component={CvList} />
        <Route exact path="/jobAdvertisement" component={JobAdvertisementList} />
        <Route exact path="/jobAdvertisementAdd" component={JobAdvertisementAdd} />
        <Route exact path="/jobAdvertisement/:jobAdvertisementId" component={JobAdvertisementDetails} />
        <Route exact path="/jobAdvertisementForEmployer/:employerId" component={JobAdvertisementListForEmployer} />
        <Route exact path="/jobAdvertisementDetailForEmployer/:jobAdvertisementId" component={JobAdvertisementDetailForEmployer} />
        <Route exact path="/employerRegister" component={EmployerRegister} />
        <Route exact path="/jobSeekerRegister" component={JobSeekerRegister} />
        <Route exact path="/educationInformation" component={CvEducationInformationList} />
        <Route exact path="/technologyAdd" component={TechnologyAdd} />
        <Route exact path="/cv/:cvId" component={CvList} />
        <Route exact path="/login" component={Login} />
    </div>
    )
}
