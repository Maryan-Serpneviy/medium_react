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
   const [, dispatch] = useContext(CurrentUserContext)
   const [token] = useLocalStorage(TOKEN_KEY)

   useEffect(() => {
      if (!token) {
         dispatch({
            type: 'SET_UNAUTHORIZED'
         })
         return
      }
      doFetch()
      dispatch({
         type: 'LOADING'
      })
   }, [token, dispatch, doFetch])

   useEffect(() => {
      if (!response) {
         return
      }
      dispatch({
         type: 'SET_AUTHORIZED',
         payload: response.user
      })
   }, [response, dispatch])

   return children
}

CurrentUserChecker.propTypes = {
   children: PropTypes.oneOfType([
      PropTypes.arrayOf(PropTypes.node),
      PropTypes.node
  ]).isRequired
}
