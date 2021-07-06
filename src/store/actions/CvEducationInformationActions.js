export const CHANGE_EDUCATION_INFORMATION_STATE = "CHANGE_EDUCATION_INFORMATION_STATE"

export default function getEducationInformationState(state) {
    return{
        type: CHANGE_EDUCATION_INFORMATION_STATE,
        payload: state
    }
}
