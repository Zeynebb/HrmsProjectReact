import axios from "axios"

export default class UserService {

    getAll(){
        return axios.get("/api/user/getAll")
    }

    updatePassword(password,passwordAgain,userId){
        return axios.post("/api/user/updatePassword?password="+password+"&passwordAgain="+passwordAgain+"&userId="+userId)
    }
}
