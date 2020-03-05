import React, { useState, useEffect, useContext } from 'react'
import { Redirect, Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import { useFetch } from '@/hooks/useFetch'
import Loader from '@com/Loader'
import Button from '@com/Button'
import TagList from '@com/TagList'
import { CurrentUserContext } from '@/context/currentUser'

type Props = {
   match: {
      params: {
         slug: string
      }
   }
}

const Article: React.FC<Props> = ({ match }) => {
   const { slug } = match.params
   const apiUrl = `articles/${slug}`
   const [{
      isLoading: fetchArticleIsLoading,
      response: fetchArticleResponse,
      error: fetchArticleError
   }, doFetchArticle] = useFetch(apiUrl)
   const [{ response: deleteArticleResponse }, doDeleteArticle] = useFetch(apiUrl)
   const [currentUserState] = useContext(CurrentUserContext)
   const [deleted, setDeleted] = useState<boolean>(false)

   const isAuthor = (): boolean => {
      if (!fetchArticleResponse || !currentUserState.isLoggedIn) {
         return false
      }
      return (
         fetchArticleResponse.article.author.username === currentUserState.currentUser.username
      )
   }

   const deleteArticle = (): void => {
      doDeleteArticle({
         method: 'DELETE'
      })
   }

   useEffect(() => {
      doFetchArticle()
   }, [doFetchArticle])

   useEffect(() => {
      if (!deleteArticleResponse) {
         return
      }
      setDeleted(true)

   }, [deleteArticleResponse])

   if (deleted) {
      return <Redirect to="/" />
   }

   return (
      <div className="article-page">
         <div className="banner">
            {fetchArticleResponse && (
               <div className="container">
                  <h1>{fetchArticleResponse.article.title}</h1>
                  <div className="article-meta">
                     <Link to={`/profiles/${fetchArticleResponse.article.author.username}`}>
                        <img src={fetchArticleResponse.article.author.image} alt=""/>
                     </Link>
                     <div className="info">
                        <Link to={`/profiles/${fetchArticleResponse.article.author.username}`}>
                           {fetchArticleResponse.article.author.username}
                        </Link>
                        <span className="date">{fetchArticleResponse.article.createdAt}</span>
                     </div>
                     {isAuthor() && (
                        <span>
                           <Link
                              to={`/articles/${fetchArticleResponse.article.slug}/edit`}
                              className="btn btn-outline-secondary btn-sm"
                           >
                              <i className="ion-edit" />
                              &nbsp;
                              Edit article
                           </Link>
                           <Button onClick={deleteArticle} className="btn btn-outline-danger btn-sm">
                              <i className="ion-trash-a" />
                           </Button>
                        </span>
                     )}
                  </div>
               </div>
            )}
         </div>
         <div className="container page">
            {fetchArticleIsLoading && <Loader />}
            {fetchArticleResponse && (
               <div className="row article-content">
                  <div className="col-xs-12">
                     <div>
                        <p>
                           {fetchArticleResponse.article.body}
                        </p>
                     </div>
                     <TagList tags={fetchArticleResponse.article.tagList} />
                  </div>
               </div>
            )}
            {fetchArticleError && <div>Something went wrong</div>}
         </div>
      </div>
   )
}

Article.propTypes = {
   match: PropTypes.object.isRequired
}

export default Article
