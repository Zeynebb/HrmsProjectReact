import axios from "axios"

export default class FavoriteService  {

    getAll(){
        return axios.get("/api/favorite/getAll")
    }
    add(favorite){
        return axios.post("/api/favorite/add", favorite)
    }
    delete(favoriteId){
        return axios.post("/api/favorite/delete?favoriteId="+favoriteId)
    }
    deleteByJobAdvertisementId(jobAdvertisementId){
        return axios.post("/api/favorite/deleteByJobAdvertisementId?jobAdvertisementId="+jobAdvertisementId)
    }
    existsJobAdvertisement(jobAdvertisementId, jobSeekerId){
        return axios.get("/api/favorite/existsByJobAdvertisement?jobAdvertisementId="+jobAdvertisementId+"&jobSeekerId="+jobSeekerId)
    }
    getAllFavoritesByUserId(userId){
        return axios.get("/api/favorite/getFavoritesByJobSeekerId?userId="+userId)
    }

}
