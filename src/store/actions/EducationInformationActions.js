export const GET_EDUCATION_INFORMATION ="GET_EDUCATION_INFORMATION"

export function getEducationInformation(educationInformation) {
    return{
        type: GET_EDUCATION_INFORMATION,
        payload: educationInformation
    }
}