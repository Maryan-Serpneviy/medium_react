/* eslint-disable no-shadow */
import Axios from 'axios'
import { useState, useEffect, useCallback } from 'react'
import { useLocalStorage } from './useLocalStorage'
import { TOKEN_KEY } from '@/constants'

const BASE_URL = 'https://conduit.productionready.io/api/'

export function useFetch(url: string) {
   const [isLoading, setIsLoading] = useState<boolean>(false)
   const [response, setResponse] = useState<null | object>(null)
   const [error, setError] = useState<null | object>(null)
   const [options, setOptions] = useState<object>({})
   const [token] = useLocalStorage(TOKEN_KEY)

   const doFetch = useCallback((options: object = {}) => {
      setOptions(options)
      setIsLoading(true)
   }, [])

   useEffect(() => {
      const requestOptions = {
         ...options,
         ...{
            headers: {
               authorization: token ? `Token ${token}` : ''
            }
         }
      }
      if (!isLoading) {
         return
      }
      Axios(BASE_URL + url, requestOptions)
      .then(response => {
         setIsLoading(false)
         setResponse(response.data)
      })
      .catch(error => {
         setIsLoading(false)
         setError(error.response.data)
         console.error(error)
      })
   }, [isLoading, options, token, url])

   return [{ isLoading, response, error }, doFetch]
}
