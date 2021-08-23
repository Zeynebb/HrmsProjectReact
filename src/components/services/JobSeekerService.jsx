import axios from "axios"

export default class JobSeekerService{

    getJobSeeker(){
        return axios.get("/api/jobSeekers/getAll")
    }

    getJobSeekerByUserId(userId){
        return axios.get("/api/jobSeekers/getJobSeekerByUserId?userId="+userId)
    }

    register(jobSeeker, passwordAgain, validationCode){
        return axios.post("/api/jobSeekers/register?passwordAgain="+passwordAgain+"&validationCode="+validationCode, jobSeeker)
    }

    emailVerification(jobSeeker, passwordAgain, validationCode){
        return axios.post("/api/jobSeekers/emailVerification?passwordAgain="+passwordAgain+"&validationCode="+validationCode, jobSeeker)
    }
    emailSending(email){
        return axios.post("/api/jobSeekers/emailSending?email="+email)
    }

    emailIsItUsed(email){
        return axios.get("/api/jobSeekers/emailIsItUsed?email="+email)
    }
    nationalityIdIsItUsed(nationalityId){
        return axios.get("/api/jobSeekers/nationalityIdIsItUsed?nationalityId="+nationalityId)
    }

}