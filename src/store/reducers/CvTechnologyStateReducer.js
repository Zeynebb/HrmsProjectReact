import { GET_CV_TECHNOLOGY_STATE } from "../actions/CvTechnologyStateActions";
import { cvTechnologyState, } from "../initialValues/CvTechnology";

const initialState = {
    cvTechnologyState: cvTechnologyState
}

export default function CvTechnologyStateReducer(state = initialState, { type, payload }) {
    switch (type) {
        case GET_CV_TECHNOLOGY_STATE:
            return payload
        default:
            return state;
    }

}
