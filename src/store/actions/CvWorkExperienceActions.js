export const CHANGE_WORK_EXPERIENCE_STATE ="CHANGE_WORK_EXPERIENCE_STATE"

export default function getCvWorkExperienceState(state) {
    return{
        type: CHANGE_WORK_EXPERIENCE_STATE,
        payload: state
    }
}

