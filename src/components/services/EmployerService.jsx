import axios from "axios"

export default class EmployerService {

    getEmployers() {
        return axios.get("/api/employers/getAll")
    }
    register(employer, passwordAgain, validationCode) {
        return axios.post("/api/employers/register?passwordAgain=" + passwordAgain + "&validationCode=" + validationCode, employer)
    }
    updateEmployer(employer) {
        return axios.post("/api/employers/update", employer)
    }
    login(email, password) {
        return axios.post("api/employers/login?email=" + email + "&password=" + password)
    }
    getAllEmployerByVerificationStatus(status) {
        return axios.get("/api/employers/getAllEmployerByVerificationStatus?status=" + status)
    }
    getByEmployerForUserId(employerId) {
        return axios.get("/api/employers/getByEmployerUserId?userId=" + employerId)
    }
    getAllUpdatedEmployer() {
        return axios.get("/api/employers/getAllUpdatedEmployer")
    }
    updatedEmployerApproval(employerId) {
        return axios.post("/api/employers/updatedEmployerVerification?employerId=" + employerId)
    }
    emailSending(email, website) {
        return axios.post("/api/employers/emailSending?email=" + email + "&website=" + website)
    }
    emailIsItUsed(email){
        return axios.get("/api/employers/emailIsItUsed?email="+email)
    }
}