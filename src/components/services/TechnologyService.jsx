import axios from "axios"

export default class TechnologyService {

    getTechnology() {
        return axios.get("/api/technology/getAll")

    }
    add(technology){
        return axios.post("/api/technology/add", technology)
    }

}