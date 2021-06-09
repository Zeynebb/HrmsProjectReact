import React, { Component } from 'react'
import CvList from '../pages/cv/CvList'
import CvEducationInformationList from '../pages/cvEducationInformation/CvEducationInformationList'
import JobSeekerList from '../pages/jobSeekers/JobSeekerList'

export default class MainLayout extends Component {
    render() {
        return (
            <div>
                
                <CvEducationInformationList/>
            </div>
        )
    }
}
