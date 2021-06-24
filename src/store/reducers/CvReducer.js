import { GET_CV_ID } from "../actions/CvActions";
import { cvId } from "../initialValues/Cv";

const initialState = {
    cvId : cvId
}


export default function CvReducer(state = initialState, {type , payload}) {
    switch (type) {
        case GET_CV_ID:
            //let cvId = state.cvId.find(c => c.cvId === payload.cvId)
            return{
                ...state
            }
    
        default:
            return state;
    }

}
