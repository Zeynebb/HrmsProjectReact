import { GET_CV_SOCIAL_MEDIA } from "../actions/CvSocialMediaActions";
import { cvSocialMedia } from "../initialValues/CvSocialMedia";

const initialState = {
    cvSocialMedia: cvSocialMedia
}

export default function CvSocialMediaReducer(state = initialState, { type, payload }) {
    switch (type) {
        case GET_CV_SOCIAL_MEDIA:
            return payload
        default:
            return state;
    }

}

