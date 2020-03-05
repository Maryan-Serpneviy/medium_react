import React, { useEffect } from 'react'
import PropTypes, { InferProps } from 'prop-types'
import { stringify } from 'query-string'
import { getPaginator } from '@/utils'
import { LIMIT } from '@/constants'
import { useFetch } from '@/hooks/useFetch'
import Loader from '../Loader'
import Feed from '../Feed'
import Pagination from '../Pagination'

type Props = {
   username: string
   location: {
      search: string
   }
   isFavorites: boolean
   url: string
}

function getApiUrl(username: string, offset: number, isFavorites: boolean): string {
   const params = isFavorites ?
      { LIMIT, offset, favorited: username } :
      { LIMIT, offset, author: username }

   return `articles?${stringify(params)}`
}

const UserArticles: React.FC<Props> = (
   { username, location, isFavorites, url } :
   InferProps<typeof UserArticles.propTypes>) => {
   
   const { offset, currentPage } = getPaginator(location.search)
   const apiUrl = getApiUrl(username, offset, isFavorites)
   const [{ isLoading, response, error }, doFetch] = useFetch(apiUrl)

   useEffect(() => {
      doFetch()
   }, [doFetch, isFavorites])

   return (
      <div>
         {isLoading && <Loader />}
         {response && (
            <>
               <Feed articles={response.articles} />
               <Pagination
                  total={response.articlesCount}
                  limit={LIMIT}
                  url={url}
                  current={currentPage}
               />
            </>
         )}
         {error && <div>Something went wrong</div>}
      </div>
   )
}

UserArticles.propTypes = {
   username: PropTypes.string.isRequired,
   location: PropTypes.object.isRequired,
   isFavorites: PropTypes.bool.isRequired,
   url: PropTypes.string.isRequired
}

export default UserArticles
