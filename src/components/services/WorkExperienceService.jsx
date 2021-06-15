import axios from "axios"

export default class WorkExperienceService {

    getWorkExperiences() {
        return axios.get("/api/workExperience/getAll")

    }

    getWorkExperiencesByCvId(cvId) {
        return axios.get("/api/workExperience/getWorkExperienceWithCvWithJobPositionDetails?cvId="+cvId)

    }

}