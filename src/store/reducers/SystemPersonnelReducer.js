import { GET_SYSTEM_PERSONNEL } from "../actions/SystemPersonnelActions";
import { systemPersonnel } from "../initialValues/SystemPersonnel";

const initialState = {
    systemPersonnel: systemPersonnel
}

export default function SystemPersonnelReducer(state = initialState, { type, payload }) {
    switch (type) {
        case GET_SYSTEM_PERSONNEL:
            return payload
        default:
            return state;
    }

}
