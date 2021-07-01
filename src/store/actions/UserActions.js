export const GET_USER ="GET_USER"

export function getUser(user) {
    return{
        type: GET_USER,
        payload: user
    }
}
