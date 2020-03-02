/* eslint-disable no-shadow */
import { useState, useEffect } from 'react'
import Axios from 'axios'

const BASE_URL = 'https://conduit.productionready.io/api/'

export function useFetch(url: string) {
   const [isLoading, setIsLoading] = useState<boolean>(false)
   const [response, setResponse] = useState<null | object>(null)
   const [error, setError] = useState<null | object>(null)
   const [options, setOptions] = useState<object>({})

   const doFetch = (options: object = {}) => {
      setOptions(options)
      setIsLoading(true)
   }

   useEffect(() => {
      if (!isLoading) {
         return
      }
      Axios(BASE_URL + url, options)
      .then(response => {
         setIsLoading(false)
         setResponse(response.data)
      })
      .catch(error => {
         setIsLoading(false)
         setError(error.response.data)
         console.error(error)
      })
   }, [isLoading])

   return [{ isLoading, response, error }, doFetch]
}
