import { LOGIN_AUTH_USER, LOGOUT_AUTH_USER } from "../utils/constants"

export const loginAuthUser = (id, name, path) => ({ type: LOGIN_AUTH_USER, id, name, path })

export const logoutAuthUser = () => ({ type: LOGOUT_AUTH_USER })
