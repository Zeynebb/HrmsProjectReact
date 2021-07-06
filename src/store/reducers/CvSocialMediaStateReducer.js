import { CHANGE_SOCIAL_MEDIA_STATE } from "../actions/CvSocialMediaActions";
import { cvSocialMediaState } from "../initialValues/CvSocialMedia";

const initialState = {
    cvSocialMediaState: cvSocialMediaState
}

export default function CvSocialMediaStateReducer(state = initialState, { type, payload }) {
    switch (type) {
        case CHANGE_SOCIAL_MEDIA_STATE:
            return payload
        default:
            return state;
    }

}
