import axios from "axios"

export default class CvSocialMediaService {

    getCvSocialMedia() {
        return axios.get("/api/cvSocialMedia/getAll")

    }

    add(cvSocialMedia){
        return axios.post("/api/cvSocialMedia/add", cvSocialMedia)
    }

    delete(cvSocialMediaId){
        return axios.post("/api/cvSocialMedia/deleteByCvSocialMediaId?cvSocialMediaId="+cvSocialMediaId)
    }

    getCvSocialMediaByCvId(cvId) {
        return axios.get("/api/cvSocialMedia/getCvSocialMediaWithSocialMediaDetails?cvId="+cvId)

    }

}