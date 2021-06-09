import axios from "axios"

export default class JobSeekerService{

    getJobSeeker(){
        return axios.get("/api/jobSeekers/getall")

    }

}