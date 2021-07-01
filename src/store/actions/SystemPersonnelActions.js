export const GET_SYSTEM_PERSONNEL ="GET_SYSTEM_PERSONNEL"

export function getSystemPersonnel(systemPersonnel) {
    return{
        type: GET_SYSTEM_PERSONNEL,
        payload: systemPersonnel
    }
}
