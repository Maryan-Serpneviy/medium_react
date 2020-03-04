import React, { createContext, useState } from 'react'
import PropTypes from 'prop-types'

export const CurrentUserContext = createContext([{}, () => {
   //
}])

export type CurrentUserStateType = {
   isLoading: boolean
   isLogggedIn: null | object
   currentUser: null | object
}

type Props = {
   children: JSX.Element | JSX.Element[]
}

export function CurrentUserProvider({ children }: Props) {

   const initialState: CurrentUserStateType = {
      isLoading: false,
      isLogggedIn: null,
      currentUser: null
   }

   const [state, setState] = useState(initialState)

   return (
      <CurrentUserContext.Provider value={[state, setState]}>
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
