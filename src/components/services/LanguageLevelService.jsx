import axios from "axios"

export default class LanguageLevelService {

    getAll(){
        return axios.get("/api/languageLevels/getAll")
    }
}
