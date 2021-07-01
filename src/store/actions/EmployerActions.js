export const GET_EMPLOYER ="GET_EMPLOYER"

export function getEmployer(employer) {
    return{
        type: GET_EMPLOYER,
        payload: employer
    }
}
