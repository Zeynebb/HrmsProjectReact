export const GET_CV_TECHNOLOGY_STATE = "GET_CV_TECHNOLOGY_STATE"

export default function getCvTechnologyState(state) {
    return {
        type: GET_CV_TECHNOLOGY_STATE,
        payload: state
    }
}
