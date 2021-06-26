import axios from "axios"

export default class CvSocialMediaService {

    getCvSocialMedia() {
        return axios.get("/api/cvSocialMedia/getAll")

    }

    add(cvSocialMedia){
        return axios.post("/api/cvSocialMedia/add", cvSocialMedia)
    }
    getCvSocialMediaByCvId(cvId) {
        return axios.get("/api/cvSocialMedia/getCvSocialMediaWithSocialMediaDetails?cvId="+cvId)

    }

}