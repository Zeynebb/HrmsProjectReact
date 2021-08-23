import axios from "axios"

export default class CvTechnologyService {

    getCvTechnologies() {
        return axios.get("/api/cvTechnology/getAll")

    }
    add(cvTechnology){
        return axios.post("/api/cvTechnology/add",cvTechnology)
    }

    delete(cvTechnologyId){
        return axios.post("/api/cvTechnology/deleteCvTechnology?cvTechnologiesId="+cvTechnologyId)
    }

    getCvTechnologiesByCvId(cvId) {
        return axios.get("/api/cvTechnology/getCvTechnologyWithTechnologydetails?cvId="+cvId)

    }

}