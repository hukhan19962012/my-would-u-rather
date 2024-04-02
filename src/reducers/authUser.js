import { LOGIN_AUTH_USER, LOGOUT_AUTH_USER } from "../utils/constants"

export const authUser = (state = null, action) => {
    switch (action.type) {
        case LOGIN_AUTH_USER:
            return { id: action.id, name: action.name, avatarPath: action.path }
        case LOGOUT_AUTH_USER:
            return null
        default:
            return state
    }
}
