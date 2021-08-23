import axios from "axios"

export default class CvForeignLanguageService {

    getCvForeignLanguages() {
        return axios.get("/api/cvForeignLanguage/getAll")

    }
    add(cvForeignLanguage){
        return axios.post("/api/cvForeignLanguage/add", cvForeignLanguage)
    }
    delete(cvForeignLanguageId){
        return axios.post("/api/cvForeignLanguage/deleteCvForeignLanguage?foreignLanguageId="+cvForeignLanguageId)
    }
    getCvForeignLanguagesByCvId(cvId) {
        return axios.get("/api/cvForeignLanguage/getCvForeignLanguageWithForeignLanguageDetails?cvId="+cvId)
    }

}