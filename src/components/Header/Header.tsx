import React, { useContext } from 'react'
import { NavLink } from 'react-router-dom'
import { CurrentUserContext, CurrentUserStateType } from '@/context/currentUser'
import classes from './Header.module.scss'

const linkStyles = {
   color: 'rgb(3, 179, 3)',
   fontSize: 32,
   fontFamily: 'Monterey Medium'
}

export default function Header() {
   const [currentUserState] = useContext(CurrentUserContext)
   const { isLoading, isLoggedIn, currentUser }: CurrentUserStateType = currentUserState
   
   return (
      <nav className='navbar navbar-light'>
         <div className='container'>
            <NavLink to="/" className="navbar-brand" style={{ ...linkStyles }}>
               Medium
            </NavLink>
            
            <ul className={'nav ' + classes.navigation}>
               <li className="nav-item">
                  <NavLink to="/" className="nav-link" activeClassName={classes.active} exact>
                     Home
                  </NavLink>
               </li>
               {!isLoggedIn && (
                  <>
                     <li className="nav-item">
                        <NavLink to="/login" className="nav-link" activeClassName={classes.active}>
                           Sign in
                        </NavLink>
                     </li>
                     <li className="nav-item">
                        <NavLink to="/register" className="nav-link" activeClassName={classes.active}>
                           Sign up
                        </NavLink>
                     </li>
                  </>
               )}
               {isLoggedIn && (
                  <>
                     <li className="nav-item">
                        <NavLink
                           to="/articles/new"
                           className="nav-link"
                           activeClassName={classes.active}
                        >
                           <i className="ion-compose"></i>
                           &nbsp;
                           New Article
                        </NavLink>
                     </li>
                     <li className="nav-item">
                        <NavLink
                           to={`/profiles/${currentUser.username}`}
                           className="nav-link"
                           activeClassName={classes.active}
                        >
                           <img src={currentUser.image} alt='' />
                           &nbsp; {currentUser.username}
                        </NavLink>
                     </li>
                  </>
               )}
            </ul>
         </div>
      </nav>
   )
}
