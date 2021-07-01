import axios from "axios"

export default class JobAdvertisementService {

    getJobAdvertisements() {
        return axios.get("/api/jobAdvertisement/getAll")
    }
    getJobAdvertisementsSorted() {
        return axios.get("/api/jobAdvertisement/getAll")

    }
    getAllByPageSize(pageNo, pageSize){
        return axios.get("/api/jobAdvertisement/getAllByPageSize?pageNo="+pageNo+"&pageSize="+pageSize)
    }
    getActiveOrPassiveJobAdvertisementsSorted(status) {
        return axios.get("/api/jobAdvertisement/getAllSortedJobAdvertisementByStatus?status="+status)

    }
    getJobAdvertisementByJobAdvertisementId(jobAdvertisementId) {
        return axios.get("/api/jobAdvertisement/getByJobAdvertisementId?id="+jobAdvertisementId)
    }

    addJobAdvertisement(jobAdvertisement){
        return axios.post("/api/jobAdvertisement/add",jobAdvertisement)
    }
    closeTheJobAdvertisement(employerId, jobAdvertisementId, status){
        return axios.post("/api/jobAdvertisement/closeTheJobAdvertisement?employerId="+employerId+"&jobAdvertisementId="+jobAdvertisementId+"&status="+status)
    }
    getJobAdvertisementForEmployerId(employerId){
        return axios.get("/api/jobAdvertisement/getByEmployerJobAdvertisements?userId="+employerId)
    }
    getActiveOrPassiveJobAdvertisementsSortedForEmployer(status, employerId) {
        return axios.get("/api/jobAdvertisement/getAllSortedJobAdvertisementByStatusForEmployerId?employerId="+employerId+"&status="+status)
    }
    getApprovedOrUnapprovedJobAdvertisement(status){
        return axios.get("/api/jobAdvertisement/getAllApproveStatus?status="+status)
    }

    changeApprovalStatusForJobAdvertisementId(jobAdvertisementID, status){
        return axios.post("/api/jobAdvertisement/updateJobAdvertisementSetApprovalStatus?jobAdvertisementId="+jobAdvertisementID+"&status="+status)
    }
    
}