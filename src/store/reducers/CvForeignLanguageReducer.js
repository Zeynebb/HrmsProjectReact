import { GET_CV_FOREIGN_LANGUAGE } from "../actions/CvForeignLanguageActions";
import { cvForeignLanguage } from "../initialValues/CvForeignLanguage";

const initialState = {
    cvForeignLanguage: cvForeignLanguage
}

export default function CvForeignLanguageReducer(state = initialState, { type, payload }) {
    switch (type) {
        case GET_CV_FOREIGN_LANGUAGE:
            return payload
        default:
            return state;
    }

}
