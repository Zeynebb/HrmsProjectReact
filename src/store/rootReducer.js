//tüm state'leri topladığımız eyr

import { combineReducers } from "redux";
import CvReducer from "./reducers/CvReducer";

const rootReducer = combineReducers({
    photo: CvReducer, 
}) 

export default rootReducer;