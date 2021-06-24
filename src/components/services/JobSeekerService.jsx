import axios from "axios"

export default class JobSeekerService{

    getJobSeeker(){
        return axios.get("/api/jobSeekers/getAll")

    }
    register(jobSeeker, passwordAgain, validationCode){
        return axios.post("/api/jobSeekers/register?passwordAgain="+passwordAgain+"&validationCode="+validationCode, jobSeeker)
    }

}