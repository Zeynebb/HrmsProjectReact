export const GET_CV_TECHNOLOGY ="GET_CV_TECHNOLOGY"

export default function getCvTechnology(cvTechnology) {
    return{
        type: GET_CV_TECHNOLOGY,
        payload: cvTechnology
    }
}
