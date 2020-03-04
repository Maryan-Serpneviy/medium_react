import React, { createContext, useState } from 'react'
import PropTypes from 'prop-types'

export const CurrentUserContext = createContext([{}, () => {
   //
}])

export type CurrentUserStateType = {
   isLoading: boolean
   isLoggedIn: boolean
   currentUser: null | object
}

type Props = {
   children: JSX.Element | JSX.Element[]
}

export function CurrentUserProvider({ children }: Props) {

   const initialState: CurrentUserStateType = {
      isLoading: false,
      isLoggedIn: false,
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
