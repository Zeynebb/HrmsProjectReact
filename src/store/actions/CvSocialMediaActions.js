export const GET_CV_SOCIAL_MEDIA ="GET_CV_SOCIAL_MEDIA"
export const CHANGE_SOCIAL_MEDIA_STATE = "CHANGE_SOCIAL_MEDIA_STATE"

export default function getCvSocialMedia(cvSocialMedia) {
    return{
        type: GET_CV_SOCIAL_MEDIA,
        payload: cvSocialMedia
    }
}

export function getCvSocialMediaState(state) {
    return{
        type: CHANGE_SOCIAL_MEDIA_STATE,
        payload: state
    }
}
