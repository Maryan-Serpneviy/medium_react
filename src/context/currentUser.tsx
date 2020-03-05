import React, { createContext, useReducer } from 'react'
import PropTypes from 'prop-types'

const initialState: CurrentUserStateType = {
   isLoading: false,
   isLoggedIn: false,
   currentUser: null
}

export type CurrentUserStateType = {
   isLoading: boolean
   isLoggedIn: boolean
   currentUser: null | object
}

function reducer(state = initialState, action) {
   switch (action.type) {
      case 'LOADING':
         return {
            ...state,
            isLoading: true
         }
      case 'SET_AUTHORIZED':
         return {
            ...state,
            isLoggedIn: true,
            isLoading: false,
            currentUser: action.payload
         }
      case 'SET_UNAUTHORIZED':
         return {
            ...state,
            isLoggedIn: false
         }
      default:
         return state
   }
}

export function CurrentUserProvider({ children }: Props) {
   //const [state, setState] = useState(initialState)
   const value = useReducer(reducer, initialState)

   return (
      <CurrentUserContext.Provider value={value}>
         {children}
      </CurrentUserContext.Provider>
   )
}

type Props = {
   children: JSX.Element | JSX.Element[]
}

CurrentUserProvider.propTypes = {
   children: PropTypes.oneOfType([
      PropTypes.arrayOf(PropTypes.node),
      PropTypes.node
  ]).isRequired
}

export const CurrentUserContext = createContext()
