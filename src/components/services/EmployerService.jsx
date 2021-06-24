import axios from "axios"

export default class EmployerService {

    getEmployers() {
        return axios.get("/api/employers/getAll")

    }
    register(employer, passwordAgain) {
        return axios.post("/api/employers/register?passwordAgain="+passwordAgain, employer)

    }
    login(email, password) {
        return axios.post("api/employers/login?email="+email+"&password="+password)
    }

    getAllEmployerByVerificationStatus(status){
         return axios.get("/api/employers/getAllEmployerByVerificationStatus?status="+status)
    }
    getByEmployerForUserId(employerId){
        return axios.get("/api/employers/getByEmployerUserId?userId="+employerId)
    }
}