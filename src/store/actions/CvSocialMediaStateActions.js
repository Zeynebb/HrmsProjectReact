export const CHANGE_SOCIAL_MEDIA_STATE = "CHANGE_SOCIAL_MEDIA_STATE"

export default function getCvSocialMediaState(state) {
    return{
        type: CHANGE_SOCIAL_MEDIA_STATE,
        payload: state
    }
}
