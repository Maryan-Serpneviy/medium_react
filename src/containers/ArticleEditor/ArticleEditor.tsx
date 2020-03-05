import React, { useState, useEffect, useContext } from 'react'
import { Redirect } from 'react-router-dom'
import PropTypes from 'prop-types'
import { useFetch } from '@/hooks/useFetch'
import ArticleForm from '@com/ArticleForm'
import { CurrentUserContext } from '@/context/currentUser'

type Props = {
   match: {
      params: {
         slug: string
      }
   }
}

const ArticleEditor: React.FC<Props> = ({ match }) => {
   const { slug } = match.params
   const apiUrl: string = `articles/${slug}`

   const [{ response: fetchArticleResponse }, fetchArticle] = useFetch(apiUrl)
   const [{
      response: updateArticleResponse,
      error: updateArticleError
   }, updateArticle] = useFetch(apiUrl)

   const [initValues, setInitValues] = useState<null | object>(null)
   const [submitted, setSubmitted] = useState<boolean>(false)
   const [currentUserState] = useContext(CurrentUserContext)

   const handleSubmit = (event: React.FormEvent) => {
      event.preventDefault()
      updateArticle({
         method: 'PUT',
         data: {
            article: {
               ...initValues
            }
         }
      })
   }

   useEffect(() => {
      fetchArticle()
   }, [fetchArticle])

   useEffect(() => {
      if (!fetchArticleResponse) {
         return
      }
      setInitValues({
         title: fetchArticleResponse.article.title,
         description: fetchArticleResponse.article.description,
         body: fetchArticleResponse.article.body,
         tagList: fetchArticleResponse.article.tagList
      })

   }, [fetchArticleResponse])

   useEffect(() => {
      if (!updateArticleResponse) {
         return
      }
      setSubmitted(true)

   }, [updateArticleResponse])

   if (!currentUserState.isLoggedIn) {
      return <Redirect to="/" />
   }

   if (submitted) {
      return <Redirect to={`/articles/${slug}`} />
   }
   
   return (
      <ArticleForm
         errors={(updateArticleError && updateArticleError.errors) || {}}
         InitValues={initValues}
         onSubmit={handleSubmit}
      />
   )
}

ArticleEditor.propTypes = {
   match: PropTypes.object.isRequired
}

export default ArticleEditor
