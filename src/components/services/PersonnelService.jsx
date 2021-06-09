import axios from "axios"

export default class PersonnelService {

    getPersonnels() {
        return axios.get("/api/personnel/getAll")

    }

}