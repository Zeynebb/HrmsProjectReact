import axios from "axios"

export default class CvSocialMediaService {

    getCvSocialMedia() {
        return axios.get("/api/cvSocialMedia/getAll")

    }
    getCvSocialMediaByCvId(cvId) {
        return axios.get("/api/cvSocialMedia/getCvSocialMediaWithSocialMediaDetails?cvId="+cvId)

    }

}