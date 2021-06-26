import axios from "axios"

export default class WorkExperienceService {

    getWorkExperiences() {
        return axios.get("/api/workExperience/getAll")

    }
    add(workExperience){
        return axios.post("/api/workExperience/add", workExperience)
    }

    getWorkExperiencesByCvId(cvId) {
        return axios.get("/api/workExperience/getWorkExperienceWithCvWithJobPositionDetails?cvId="+cvId)

    }

}