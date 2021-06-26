import { GET_WORK_EXPERIENCE } from "../actions/WorkExperienceActions";
import { workExperience } from "../initialValues/WorkExperience";

const initialState = {
    workExperience: workExperience
}

export default function WorkExperienceReducer(state = initialState, { type, payload }) {
    switch (type) {
        case GET_WORK_EXPERIENCE:
            return payload
        default:
            return state;
    }

}