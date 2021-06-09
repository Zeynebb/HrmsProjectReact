import axios from "axios"

export default class CvSocialMediaService {

    getCvSocialMedia() {
        return axios.get("/api/cvSocialMedia/getAll")

    }

}