export const LIST_TO_PHOTO = "LIST_TO_PHOTO"


export function listToPhoto(photo) {
    return{
        type: LIST_TO_PHOTO,
        payload: photo
    }
}