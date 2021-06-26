export const GET_CV_FOREIGN_LANGUAGE ="GET_CV_FOREIGN_LANGUAGE"

export default function getCvForeignLanguage(cvForeignLanguage) {
    return{
        type: GET_CV_FOREIGN_LANGUAGE,
        payload: cvForeignLanguage
    }
}

