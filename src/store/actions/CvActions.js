export const GET_CV ="GET_CV"

export function getCv(cv) {
    return{
        type: GET_CV,
        payload: cv
    }
}