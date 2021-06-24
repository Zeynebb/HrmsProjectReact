import { profilePhoto } from "../initialValues/ProfilePhoto";
import { LIST_TO_PHOTO } from "../actions/PhotoActions";

const initialState ={
    profilePhoto: profilePhoto
}
//henüz kullanmadım yanlış olabilir 
export default function PhotoReducer(state = initialState, {type, payload}) {
    
    switch (type) {
        case LIST_TO_PHOTO:
            let photo = state.profilePhoto.find(p => p.cv.cvId === payload.cvId)
            if (photo) {
                return {
                    ...state
                }
            }   
        default:
            return state;
    }
}
