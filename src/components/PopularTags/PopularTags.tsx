import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useFetch } from '@/hooks/useFetch'
import Loader from '../Loader'

export default function PopularTags() {
   const [{ isLoading, response, error }, doFetch] = useFetch('tags')

   useEffect(() => {
      doFetch()
   }, [doFetch])

   return (
      <div className="sidebar">
         {isLoading && <Loader />}

         {response && (
            <>
            <p>Popular tags</p>
            <div className="tag-list">
               {response.tags.map((tag: string) => (
                  <Link
                     to={`tags/${tag}`}
                     className="tag-default tag-pill"
                     key={tag}
                  >
                     {tag}
                  </Link>
               ))}
            </div>
            </>
         )}

         {error && <p>Something went wrong</p>}
      </div>
   )
}
