import axios from "axios"

export default class PhotoService {

    getPhotos() {
        return axios.get("/api/photo/getAll")

    }

}