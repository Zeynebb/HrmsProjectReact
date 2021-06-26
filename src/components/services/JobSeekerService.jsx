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

}