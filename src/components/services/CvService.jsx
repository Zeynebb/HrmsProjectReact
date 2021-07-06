import axios from "axios"

export default class CvService {

    getCvs() {
        return axios.get("/api/cv/getAll")
    }
    addCv(cv) {
        return axios.post("/api/cv/addCv", cv)
    }

    getCvsByCvId(cvId) {
        return axios.get("/api/cv/getCvWithJobSeekerDetails?cvId=" + cvId)
    }

    getCvsByJobSeekerId(jobSeekerId) {
        return axios.get("/api/cv/getByCvIdForJobSeeker_UserId?userId=" + jobSeekerId)
    }

    updateCreationDate(cvId){
        return axios.post("/api/cv/updateCvSetCreationDate?cvId="+cvId)
    }

}