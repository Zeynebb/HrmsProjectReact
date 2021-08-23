export const GET_JOB_SEEKER ="GET_JOB_SEEKER"

export function getJobSeeker(jobSeeker) {
    return{
        type: GET_JOB_SEEKER,
        payload: jobSeeker
    }
}
