export const GET_CV_ID ="GET_CV_ID"

export function getCvId(cvId) {
    return{
        type: GET_CV_ID,
        payload: cvId
    }
}