import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { stringify } from 'query-string'
import { useFetch } from '@/hooks/useFetch'
import { getPaginator } from '@/utils'
import { LIMIT } from '@/constants'
import Loader from '@com/Loader'
import Feed from '@com/Feed'
import Pagination from '@com/Pagination'
import PopularTags from '@com/PopularTags'

type Props = {
   location: {
      search: string
   }
   match: {
      url: string
   }
}

const GlobalFeed: React.FC<Props> = ({ location, match }) => {
   const { offset, currentPage } = getPaginator(location.search)
   const stringifiedParams = stringify({
      LIMIT, offset
   })
   const apiUrl = `articles?${stringifiedParams}`
   const [{ isLoading, response, error }, doFetch] = useFetch(apiUrl)
   
   useEffect(() => {
      doFetch()
   }, [doFetch, currentPage])

   return (
      <div className="home-page">
         <div className="banner">
            <div className="container">
               <h1>Medium clone</h1>
               <p>Place to share knowledge</p>
            </div>
         </div>
         <div className="container page">
            <div className="row">
               <div className="col-md-9">
                  {isLoading && <Loader />}
                  {response && (
                     <>
                        <Feed articles={response.articles} />
                        <Pagination
                           total={response.articlesCount}
                           limit={LIMIT}
                           current={currentPage}
                           url={match.url}
                        />
                     </>
                  )}
                  {error && <div>Something went wrong</div>}
               </div>
               <div className="col-md-3">
                  <PopularTags />
               </div>
            </div>
         </div>
      </div>
   )
}

GlobalFeed.propTypes = {
   location: PropTypes.object.isRequired,
   match: PropTypes.object.isRequired
}

export default GlobalFeed
