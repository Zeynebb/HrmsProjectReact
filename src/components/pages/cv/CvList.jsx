import React, { useEffect, useState } from 'react'
import CvService from '../../services/CvService'
import '../../../css/CvList.css'
import CvEducationInformationList from '../cvEducationInformation/CvEducationInformationList';
import CvWorkExperienceList from '../cvWorkExperiences/CvWorkExperienceList';
import CvTechnologyList from '../cvTechnologies/CvTechnologyList';
import CvSocialMediaList from '../cvSocialMedia/CvSocialMediaList';
import CvForeignLanguageList from '../cvForeignLanguages/CvForeignLanguageList';
import JobSeekerDetail from '../jobSeekers/JobSeekerDetail';
import CvEducationInformationListUpdate from '../cvEducationInformation/CvEducationInformationListUpdate';
import { useSelector } from 'react-redux';
import CvObjectiveUpdate from '../cvObjective/CvObjectiveUpdate';
import CvObjective from '../cvObjective/CvObjective';
import CvWorkExperienceUpdate from '../cvWorkExperiences/CvWorkExperienceUpdate';
import CvTechnologyUpdate from '../cvTechnologies/CvTechnologyUpdate';
import CvForeignLanguageUpdate from '../cvForeignLanguages/CvForeignLanguageUpdate';
import CvSocialMediaUpdate from '../cvSocialMedia/CvSocialMediaUpdate';
import { useParams } from 'react-router';

export default function CvList() {

    let { cvId } = useParams()
    let { jobSeekerId } = useParams()

    const educationInformations = useSelector(state => state.educationInformation.educationId)
    const cvIds = useSelector(state => state.cv.cvId)
    const workExperienceId = useSelector(state => state.workExperience.workExperienceId)
    const cvTechnologyId = useSelector(state => state.cvTechnology.cvTechnologyId)
    const cvForeignLanguageId = useSelector(state => state.cvForeignLanguage.cvForeignLanguageId)
    const cvSocialMediaId = useSelector(state => state.cvSocialMedia.cvSocialMediaId)

    const [cvs, setCvs] = useState([]);

    useEffect(() => {
        let cvService = new CvService()
        cvService.getCvsByCvId(cvId).then(result => setCvs(result.data.data))
    }, [])

    return (
        <div>
            <JobSeekerDetail />
            <br />
            <br />
            {(cvIds) > 0 ? <CvObjectiveUpdate />
                : <CvObjective />}
            <br />
            <br />
            {(educationInformations) > 0 ? <CvEducationInformationListUpdate />
                : <CvEducationInformationList />}
            <br />
            <br />
            {(workExperienceId) > 0 ? <CvWorkExperienceUpdate />
                : <CvWorkExperienceList />}
            <br />
            <br />
            {(cvTechnologyId) > 0 ? <CvTechnologyUpdate />
                : <CvTechnologyList />}
            <br />
            <br />
            {(cvForeignLanguageId) > 0 ? <CvForeignLanguageUpdate />
                : <CvForeignLanguageList />}
            <br />
            <br />
            {(cvSocialMediaId) > 0 ? <CvSocialMediaUpdate />
                : <CvSocialMediaList />}
            <br />
            <br />
        </div>
    )
}
