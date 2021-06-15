import axios from "axios"

export default class CvForeignLanguageService {

    getCvForeignLanguages() {
        return axios.get("/api/cvForeignLanguage/getAll")

    }
    getCvForeignLanguagesByCvId(cvId) {
        return axios.get("/api/cvForeignLanguage/getCvForeignLanguageWithForeignLanguageDetails?cvId="+cvId)
    }

}