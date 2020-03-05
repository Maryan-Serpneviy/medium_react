import React, { useState, useEffect, useContext } from 'react'
import { Redirect } from 'react-router-dom'
import { useFetch } from '@/hooks/useFetch'
import ArticleForm from '@com/ArticleForm'
import { CurrentUserContext } from '../../context/currentUser'

export default function ArticleCreator() {
   const apiUrl = 'articles'
   const [{ response, error }, doFetch] = useFetch(apiUrl)
   const [submitted, setSubmitted] = useState<boolean>(false)
   const [currentUserState] = useContext(CurrentUserContext)

   const initValues = {
      title: '' as string,
      description: '' as string,
      body: '' as string,
      tagList: [] as [] | string[]
   }

   const handleSubmit = (article: object): void => {
      doFetch({
         method: 'POST',
         data: {
            article
         }
      })
   }

   useEffect(() => {
      if (!response) {
         return
      }
      setSubmitted(true)
   }, [response])

   if (!currentUserState.isLoggedIn) {
      return <Redirect to="/" />
   }

   if (submitted) {
      return <Redirect to={`/articles/${response.article.slug}`} />
   }

   return (
      <div>
         <ArticleForm
            errors={(error && error.errors) || {}}
            initValues={initValues}
            onSubmit={handleSubmit}
         />
      </div>
   )
}
