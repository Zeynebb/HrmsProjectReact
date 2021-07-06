export const GET_CV_FOREIGN_LANGUAGE ="GET_CV_FOREIGN_LANGUAGE"
export const GET_CV_FOREIGN_LANGUAGE_STATE ="GET_CV_FOREIGN_LANGUAGE_STATE"

export default function getCvForeignLanguage(cvForeignLanguage) {
    return{
        type: GET_CV_FOREIGN_LANGUAGE,
        payload: cvForeignLanguage
    }
}

export function getCvForeignLanguageState(state) {
    return{
        type: GET_CV_FOREIGN_LANGUAGE_STATE,
        payload: state
    }
}
