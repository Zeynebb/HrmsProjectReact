export const GET_WORK_EXPERIENCE ="GET_WORK_EXPERIENCE"

export function getWorkExperience(workExperience) {
    return{
        type: GET_WORK_EXPERIENCE,
        payload: workExperience
    }
}
