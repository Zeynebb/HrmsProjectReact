import { CHANGE_EDUCATION_INFORMATION_STATE } from "../actions/CvEducationInformationActions";
import { educationInformationState } from "../initialValues/EducationInformation";

const initialState = {
    educationInformationState: educationInformationState
}

export default function CvEducationInformationStateReducer(state = initialState, { type, payload }) {
    switch (type) {
        case CHANGE_EDUCATION_INFORMATION_STATE:
            return payload
        default:
            return state;
    }

}
