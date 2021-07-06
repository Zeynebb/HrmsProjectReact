//tüm state'leri topladığımız eyr

import { combineReducers } from "redux";
import CvReducer from "./reducers/CvReducer";
import EducationInformationReducer from "./reducers/EducationInformationReducer";
import WorkExperienceReducer from "./reducers/WorkExperienceReducer";
import CvTechnologyReducer from "./reducers/CvTechnologyReducer";
import CvForeignLanguageReducer from "./reducers/CvForeignLanguageReducer";
import CvSocialMediaReducer from "./reducers/CvSocialMediaReducer";
import SystemPersonnelReducer from "./reducers/SystemPersonnelReducer";
import EmployerReducer from "./reducers/EmployerReducer";
import UserReducer from "./reducers/UserReducer";
import CvEducationInformationStateReducer from "./reducers/CvEducationInformationStateReducer";
import CvWorkExperienceStateReducer from "./reducers/CvWorkExperienceStateReducer";
import CvTechnologyStateReducer from "./reducers/CvTechnologyStateReducer";
import CvForeignLanguageStateReducer from "./reducers/CvForeignLanguageStateReducer";
import CvSocialMediaStateReducer from "./reducers/CvSocialMediaStateReducer";

const rootReducer = combineReducers({
    cv: CvReducer,
    educationInformation: EducationInformationReducer,
    workExperience: WorkExperienceReducer,
    cvTechnology: CvTechnologyReducer,
    cvForeignLanguage: CvForeignLanguageReducer,
    cvSocialMedia: CvSocialMediaReducer,
    systemPersonnel: SystemPersonnelReducer,
    employer: EmployerReducer,
    user: UserReducer,
    
    educationInformationState: CvEducationInformationStateReducer,
    workExperienceState: CvWorkExperienceStateReducer,
    cvTechnologyState: CvTechnologyStateReducer,
    cvForeignLanguageState: CvForeignLanguageStateReducer,
    cvSocialMediaState: CvSocialMediaStateReducer,

}) 

export default rootReducer;