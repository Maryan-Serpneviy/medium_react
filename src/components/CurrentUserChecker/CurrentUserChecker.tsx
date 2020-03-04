import { useEffect, useContext } from 'react'
import PropTypes from 'prop-types'
import { useFetch } from '@/hooks/useFetch'
import { useLocalStorage } from '@/hooks/useLocalStorage'
import { CurrentUserContext, CurrentUserStateType } from '@/context/currentUser'
import { TOKEN_KEY } from '@/constants'

type Props = {
   children: JSX.Element[] | JSX.Element
}

export default function CurrentUserChecker({ children }: Props) {
   const [{ response }, doFetch] = useFetch('user')
   const [, setCurrentUserState] = useContext(CurrentUserContext)
   const [token] = useLocalStorage(TOKEN_KEY)

   useEffect(() => {
      if (!token) {
         setCurrentUserState((state: CurrentUserStateType) => ({
            ...state,
            isLoggedIn: false
         }))
         return
      }

      doFetch()
      setCurrentUserState((state: CurrentUserStateType) => ({
         ...state,
         isLoading: true
      }))
   }, [token, setCurrentUserState, doFetch])

   useEffect(() => {
      if (!response) {
         return
      }

      setCurrentUserState((state: CurrentUserStateType) => ({
         ...state,
         isLoggedIn: true,
         isLoading: false,
         currentUser: response.user
      }))
   }, [response, setCurrentUserState])

   return children
}

CurrentUserChecker.propTypes = {
   children: PropTypes.oneOfType([
      PropTypes.arrayOf(PropTypes.node),
      PropTypes.node
  ]).isRequired
}
