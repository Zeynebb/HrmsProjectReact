import { GET_CV } from "../actions/CvActions";
import { cvs } from "../initialValues/Cv";

const initialState = {
    cvs: cvs
}

export default function CvReducer(state = initialState, { type, payload }) {
    switch (type) {
        case GET_CV:
            return payload
        default:
            return state;
    }

}
