import axios from "axios"

export default class EducationInformationService {

    getEducationInformations() {
        return axios.get("/api/educationInformation/getAll")

    }
    getEducationInformationsByCvId(cvId) {
        return axios.get("/api/educationInformation/getEducationInformationWithCvWithUniversityWithUniversityDepartmentDetails?cvId="+cvId)

    }

}