import { GET_CV_TECHNOLOGY } from "../actions/CvTechnologyActions";
import { cvTechnology, } from "../initialValues/CvTechnology";

const initialState = {
    cvTechnology: cvTechnology
}

export default function CvTechnologyReducer(state = initialState, { type, payload }) {
    switch (type) {
        case GET_CV_TECHNOLOGY:
            return payload
        default:
            return state;
    }

}
