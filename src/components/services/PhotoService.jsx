import axios from "axios"

export default class PhotoService {

    getPhotos() {
        return axios.get("/api/photo/getAll")

    }
    getPhotoForCvId(cvId){
        return axios.get("/api/photo/getByPhotoForCvId?cvId="+cvId)
    }

}