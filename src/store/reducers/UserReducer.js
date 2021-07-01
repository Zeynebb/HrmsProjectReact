import { GET_USER } from "../actions/UserActions";
import { user } from "../initialValues/User";

const initialState = {
    user: user
}

export default function UserReducer(state = initialState, { type, payload }) {
    switch (type) {
        case GET_USER:
            return payload
        default:
            return state;
    }

}
