import axios from "axios"

export default class CvForeignLanguageService {

    getCvForeignLanguages() {
        return axios.get("/api/cvForeignLanguage/getAll")

    }
    add(cvForeignLanguage){
        return axios.post("/api/cvForeignLanguage/add", cvForeignLanguage)
    }
    getCvForeignLanguagesByCvId(cvId) {
        return axios.get("/api/cvForeignLanguage/getCvForeignLanguageWithForeignLanguageDetails?cvId="+cvId)
    }

}