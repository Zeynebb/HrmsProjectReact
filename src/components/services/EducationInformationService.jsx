import axios from "axios"

export default class EducationInformationService {

    getEducationInformations() {
        return axios.get("/api/educationInformation/getAll")
    }
    getEducationInformationsByCvId(cvId) {
        return axios.get("/api/educationInformation/getEducationInformationWithCvWithUniversityWithUniversityDepartmentDetails?cvId="+cvId)
    }
    getEducationInformationsByEducationId(educationId) {
        return axios.get("/api/educationInformation/getEducationInformationDetails?educationId="+educationId)        
    }

    add(educationInformation){
        return axios.post("/api/educationInformation/add", educationInformation)
    }

}