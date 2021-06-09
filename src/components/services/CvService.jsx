import axios from "axios"

export default class CvService {

    getCvs() {
        return axios.get("/api/cv/getAll")

    }

}