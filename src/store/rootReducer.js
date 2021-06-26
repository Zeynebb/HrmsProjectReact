//tüm state'leri topladığımız eyr

import { combineReducers } from "redux";
import CvReducer from "./reducers/CvReducer";
import EducationInformationReducer from "./reducers/EducationInformationReducer";
import WorkExperienceReducer from "./reducers/WorkExperienceReducer";
import CvTechnologyReducer from "./reducers/CvTechnologyReducer";
import CvForeignLanguageReducer from "./reducers/CvForeignLanguageReducer";
import CvSocialMediaReducer from "./reducers/CvSocialMediaReducer";

const rootReducer = combineReducers({
    cv: CvReducer,
    educationInformation: EducationInformationReducer,
    workExperience: WorkExperienceReducer,
    cvTechnology: CvTechnologyReducer,
    cvForeignLanguage: CvForeignLanguageReducer,
    cvSocialMedia: CvSocialMediaReducer,

}) 

export default rootReducer;