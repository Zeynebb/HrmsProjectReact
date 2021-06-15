import axios from "axios"

export default class JobAdvertisementService {

    getJobAdvertisements() {
        return axios.get("/api/jobAdvertisement/getAll")

    }
    getJobAdvertisementByJobAdvertisementId(jobAdvertisementId) {
        return axios.get("/api/jobAdvertisement/getByJobAdvertisementId?id="+jobAdvertisementId)
    }

    addJobAdvertisement(jobAdvertisement){
        return axios.post("/api/jobAdvertisement/add",jobAdvertisement)
    }

}