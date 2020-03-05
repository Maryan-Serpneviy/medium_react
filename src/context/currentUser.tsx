import React, { createContext, useReducer } from 'react'
import PropTypes from 'prop-types'
import reducer, { initialState } from './reducers/currentUser'

type Props = {
   children: JSX.Element | JSX.Element[]
}

export function CurrentUserProvider({ children }: Props) {
   const value = useReducer(reducer, initialState)

   return (
      <CurrentUserContext.Provider value={value}>
         {children}
      </CurrentUserContext.Provider>
   )
}

CurrentUserProvider.propTypes = {
   children: PropTypes.oneOfType([
      PropTypes.arrayOf(PropTypes.node),
      PropTypes.node
  ]).isRequired
}

export const CurrentUserContext = createContext(null)
