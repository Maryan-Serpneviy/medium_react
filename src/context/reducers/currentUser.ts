import Actions from '../actions/actionTypes'
import { ActionsTypes } from '../actions/currentUser'

export const initialState = {
   isLoading: false as boolean,
   isLoggedIn: false as boolean,
   currentUser: null as null | object
}
export type StateType = typeof initialState

export default function currentUserReducer (state = initialState, action: ActionsTypes): StateType {
   switch (action.type) {
      case Actions.SET_LOADING:
         return {
            ...state,
            isLoading: true
         }
      case Actions.SET_AUTHORIZED:
         return {
            ...state,
            isLoggedIn: true,
            isLoading: false,
            currentUser: action.payload
         }
      case Actions.SET_UNAUTHORIZED:
         return {
            ...state,
            isLoggedIn: false
         }
      case Actions.LOGOUT:
         return {
            ...initialState
         }
      default:
         return state
   }
}
