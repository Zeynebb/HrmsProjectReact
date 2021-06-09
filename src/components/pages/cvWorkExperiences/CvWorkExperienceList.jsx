import React from 'react'
import WorkExperienceService from '../../services/WorkExperienceService'

export default function CvWorkExperienceList() {

    const [workExperiences, setWorkExperiences] = useState([]);

    useEffect(() => {
        let workExperienceService = new WorkExperienceService()
        workExperienceService.getWorkExperiences().then(result => setWorkExperiences(result.data.data))
    }, [])


    return (
        <div>
            
        </div>
    )
}
