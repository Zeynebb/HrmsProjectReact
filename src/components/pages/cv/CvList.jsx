import React, { useEffect, useState } from 'react'
import CvService from '../../services/CvService'
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
import CvEducationInformationAdd from '../cvEducationInformation/CvEducationInformationAdd';
import CvWorkExperienceAdd from '../cvWorkExperiences/CvWorkExperienceAdd';
import CvTechnologyAdd from '../cvTechnologies/CvTechnologyAdd';
import CvForeignLanguageAdd from '../cvForeignLanguages/CvForeignLanguageAdd';
import CvSocialMediaAdd from '../cvSocialMedia/CvSocialMediaAdd';

export default function CvList() {

    let { cvId } = useParams()
    let { userId } = useParams()

    const cvIds = useSelector(state => state.cv.cvId)

    //redux ile state kontrolü
    const educationInformationState = useSelector(state => state.educationInformationState.state)
    const workExperienceState = useSelector(state => state.workExperienceState.state)
    const cvTechnologyState = useSelector(state => state.cvTechnologyState.state)
    const cvForeignLanguageState = useSelector(state => state.cvForeignLanguageState.state)
    const cvSocialMediaState = useSelector(state => state.cvSocialMediaState.state)

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
            {educationInformationState == null && <CvEducationInformationList />
            }
            {educationInformationState == 1 && <CvEducationInformationListUpdate />
            }
            {educationInformationState == 2 && <CvEducationInformationAdd />
            }
            <br />
            <br />

            {workExperienceState == null && <CvWorkExperienceList />}
            {workExperienceState == 1 && <CvWorkExperienceUpdate />}
            {workExperienceState == 2 && <CvWorkExperienceAdd />}
            <br />
            <br />
            {cvTechnologyState == null && <CvTechnologyList />}
            {cvTechnologyState == 1 && <CvTechnologyUpdate />}
            {cvTechnologyState == 2 && <CvTechnologyAdd />}
            <br />
            <br />
            {cvForeignLanguageState == null && <CvForeignLanguageList />}
            {cvForeignLanguageState == 1 && <CvForeignLanguageUpdate />}
            {cvForeignLanguageState == 2 && <CvForeignLanguageAdd />}
            <br />
            <br />
            {cvSocialMediaState == null && <CvSocialMediaList />}
            {cvSocialMediaState == 1 && <CvSocialMediaUpdate />}
            {cvSocialMediaState == 2 && <CvSocialMediaAdd />}
            <br />
            <br />
        </div>
    )
}
