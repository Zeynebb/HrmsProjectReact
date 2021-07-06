import { CHANGE_WORK_EXPERIENCE_STATE } from "../actions/CvWorkExperienceActions";
import { workExperienceState } from "../initialValues/CvWorkExperienceState";

const initialState = {
    workExperienceState: workExperienceState
}

export default function CvWorkExperienceStateReducer(state = initialState, { type, payload }) {
    switch (type) {
        case CHANGE_WORK_EXPERIENCE_STATE:
            return payload
        default:
            return state;
    }

}