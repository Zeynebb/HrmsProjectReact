import axios from "axios"

export default class SocialMediaService {

    getSocialMedia() {
        return axios.get("/api/socialMedia/getAll")

    }

}