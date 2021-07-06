import { GET_CV_FOREIGN_LANGUAGE_STATE } from "../actions/CvForeignLanguageActions";
import { cvForeignLanguageState } from "../initialValues/CvForeignLanguage";

const initialState = {
    cvForeignLanguageState: cvForeignLanguageState
}

export default function CvForeignLanguageStateReducer(state = initialState, { type, payload }) {
    switch (type) {
        case GET_CV_FOREIGN_LANGUAGE_STATE:
            return payload
        default:
            return state;
    }

}