import axios from "axios"

export default class EmailService {

    emailCheck(email){
        return axios.get("/api/emails/emailCheck?email="+email)
    }

}