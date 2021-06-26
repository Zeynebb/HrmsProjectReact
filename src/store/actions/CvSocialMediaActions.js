export const GET_CV_SOCIAL_MEDIA ="GET_CV_SOCIAL_MEDIA"

export default function getCvSocialMedia(cvSocialMedia) {
    return{
        type: GET_CV_SOCIAL_MEDIA,
        payload: cvSocialMedia
    }
}
