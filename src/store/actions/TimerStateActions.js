export const GET_TIMER_STATE = "GET_TIMER_STATE"

export default function getTimerState(state) {
    return {
        type: GET_TIMER_STATE,
        payload: state
    }
}

