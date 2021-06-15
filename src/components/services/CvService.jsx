import axios from "axios"

export default class CvService {

    getCvs() {
        return axios.get("/api/cv/getAll")
    }

    getCvsByCvId(cvId) {
        return axios.get("/api/cv/getCvWithJobSeekerDetails?cvId="+cvId)
    }

}