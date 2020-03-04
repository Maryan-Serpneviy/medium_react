import React from 'react'
import PropTypes, { InferProps } from 'prop-types'
import { Link } from 'react-router-dom'
import { range } from '@/utils'
import classNames from 'classnames'
import classes from './Pagination.module.scss'

type Props = {
   total: number
   limit: number
   current: number
   url: string
}

const Pagination: React.FC<Props> = (
   { total, limit, current, url }
   : InferProps<typeof Pagination.propTypes>) => {
   
   const pagesCount = Math.ceil(total / limit)
   const pages = range(1, pagesCount)

   return (
      <ul className={classes.pagination}>
         {pages.map((page: number) => {
            const liClasses = classNames({
               'page-item': true,
               'active': current === page
            })

            return (
               <li key={page} className={liClasses}>
                  <Link to={`${url}?page=${page}`} className="page-link">
                     {page}
                  </Link>
               </li>
            )
         })}
      </ul>
   )
}

Pagination.propTypes = {
   total: PropTypes.number.isRequired,
   limit: PropTypes.number.isRequired,
   current: PropTypes.number.isRequired,
   url: PropTypes.string.isRequired
}

export default Pagination
