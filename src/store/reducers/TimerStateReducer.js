import { GET_TIMER_STATE } from "../actions/TimerStateActions";
import { timerState } from "../initialValues/Timer";

const initialState = {
    timerState: timerState
}

export default function TimerStateReducer(state = initialState, { type, payload }) {
    switch (type) {
        case GET_TIMER_STATE:
            return payload
        default:
            return state;
    }

}
