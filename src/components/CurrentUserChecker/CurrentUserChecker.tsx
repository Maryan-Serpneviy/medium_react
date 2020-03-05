import { useEffect, useContext } from 'react'
import PropTypes from 'prop-types'
import { useFetch } from '@/hooks/useFetch'
import { useLocalStorage } from '@/hooks/useLocalStorage'
import { CurrentUserContext } from '@/context/currentUser'
import * as Action from '@/context/actions/currentUser'
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
         dispatch(Action.setUnauthorized())
         return
      }
      doFetch()
      dispatch(Action.setLoading())
   }, [token, dispatch, doFetch])

   useEffect(() => {
      if (!response) {
         return
      }
      dispatch(Action.setAuthorized(response.user))

   }, [response, dispatch])

   return children
}

CurrentUserChecker.propTypes = {
   children: PropTypes.oneOfType([
      PropTypes.arrayOf(PropTypes.node),
      PropTypes.node
  ]).isRequired
}
