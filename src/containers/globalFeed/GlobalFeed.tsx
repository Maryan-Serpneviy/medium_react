import React, { useEffect } from 'react'
import { useFetch } from '@/hooks/useFetch'
import Feed from '@com/Feed'
import Loader from '@com/Loader'

export default function GlobalFeed() {
   const apiUrl = 'articles?limit=10&offset=0'
   const [{ isLoading, response, error }, doFetch] = useFetch(apiUrl)
   
   useEffect(() => {
      doFetch()
   }, [doFetch])

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
                  {error && <div>Something went wrong</div>}
                  {!isLoading && response && (
                     <Feed articles={response.articles} />
                  )}
               </div>
               <div className="col-md-3">
                  Popular tags
               </div>
            </div>
         </div>
      </div>
   )
}
