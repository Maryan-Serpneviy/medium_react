import React, { useContext } from 'react'
import { NavLink } from 'react-router-dom'
import PropTypes, { InferProps } from 'prop-types'
import { CurrentUserContext } from '@/context/currentUser'

type Props = {
   tagName?: string
}

const FeedToggler: React.FC<Props> = ({ tagName }: InferProps<typeof FeedToggler.propTypes>) => {
   const [currentUserState] = useContext(CurrentUserContext)
   return (
      <div className="feed-toggle">
         <ul className="nav nav-pills outline-active">
            {currentUserState.isLoggedIn && (
               <li className="nav-item">
                  <NavLink to="/feed" className="nav-link">
                     Your feed
                  </NavLink>
               </li>
            )}
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
   tagName: PropTypes.string
}

export default FeedToggler
