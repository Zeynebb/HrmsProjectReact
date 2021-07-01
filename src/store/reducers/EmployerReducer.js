import { GET_EMPLOYER } from "../actions/EmployerActions";
import { employer } from "../initialValues/Employer";

const initialState = {
    employer: employer
}

export default function EmployerReducer(state = initialState, { type, payload }) {
    switch (type) {
        case GET_EMPLOYER:
            return payload
        default:
            return state;
    }

}