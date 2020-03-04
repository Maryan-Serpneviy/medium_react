import React from 'react'
import { NavLink } from 'react-router-dom'
import PropTypes, { InferProps } from 'prop-types'

type Props = {
   tagName: string
}

const FeedToggler: React.FC<Props> = ({ tagName }: InferProps<typeof FeedToggler.propTypes>) => {
   return (
      <div className="feed-toggle">
         <ul className="nav nav-pills outline-active">
            <li className="nav-item">
               <NavLink to="/feed" className="nav-link">
                  Your feed
               </NavLink>
            </li>
            <li className="nav-item">
               <NavLink to="/" className="nav-link" exact>
                  Global feed
               </NavLink>
            </li>
            {tagName && (
               <li className="nav-item">
                  <NavLink to={`/tags/${tagName}`} className="nav-link">
                     <i className="ion-pound" />
                     {tagName}
                  </NavLink>
               </li>
            )}
         </ul>
      </div>
   )
}

FeedToggler.propTypes = {
   tagName: PropTypes.string.isRequired
}

export default FeedToggler
