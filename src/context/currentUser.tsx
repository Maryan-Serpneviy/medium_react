import React, { createContext, useState } from 'react'

export const CurrentUserContext = createContext([{}, () => {
   //
}])

export type CurrentUserStateType = {
   isLoading: boolean
   isLogggedIn: null | object
   currentUser: null | object
}

export function CurrentUserProvider({ children }) {
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
