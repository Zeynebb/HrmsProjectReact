import { GET_EDUCATION_INFORMATION } from "../actions/EducationInformationActions";
import { educationInformation } from "../initialValues/EducationInformation";

const initialState = {
    educationInformation: educationInformation
}

export default function EducationInformationReducer(state = initialState, { type, payload }) {
    switch (type) {
        case GET_EDUCATION_INFORMATION:
            return payload
        default:
            return state;
    }

}