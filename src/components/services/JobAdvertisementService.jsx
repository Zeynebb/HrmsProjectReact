import axios from "axios"

export default class JobAdvertisementService {

    getJobAdvertisements() {
        return axios.get("/api/jobAdvertisement/getAll")

    }

}