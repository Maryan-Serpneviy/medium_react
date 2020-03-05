import Types from './actionTypes'

type SetLoadingType = { type: typeof Types.SET_LOADING }
export const setLoading = (): SetLoadingType => ({ type: Types.SET_LOADING })

type SetAuthorizedType = { type: typeof Types.SET_AUTHORIZED, payload: object }
export const setAuthorized = (payload: object): SetAuthorizedType => ({
   type: Types.SET_AUTHORIZED,
   payload
})

type SetUnauthorizedType = { type: typeof Types.SET_UNAUTHORIZED }
export const setUnauthorized = (): SetUnauthorizedType => ({ type: Types.SET_UNAUTHORIZED })

type LogoutUserType = { type: typeof Types.LOGOUT }
export const logoutUser = (): LogoutUserType => ({ type: Types.LOGOUT })

export type ActionsTypes = SetLoadingType | SetAuthorizedType | SetUnauthorizedType | LogoutUserType
