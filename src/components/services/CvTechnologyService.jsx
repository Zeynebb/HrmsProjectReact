import axios from "axios"

export default class CvTechnologyService {

    getCvTechnologies() {
        return axios.get("/api/cvTechnology/getAll")

    }
    getCvTechnologiesByCvId(cvId) {
        return axios.get("/api/cvTechnology/getCvTechnologyWithTechnologydetails?cvId="+cvId)

    }

}