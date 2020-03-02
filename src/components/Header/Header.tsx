import React from 'react'
import { NavLink } from 'react-router-dom'

const linkStyles = {
   color: 'rgb(3, 179, 3)',
   fontSize: 28,
   fontFamily: 'Monterey Medium'
}

export default function Header() {
   return (
      <nav className='navbar navbar-light'>
         <div className='container'>
            <NavLink to="/" className='navbar-brand' style={{ ...linkStyles }}>
               Medium
            </NavLink>
            <ul className="nav navbar-nav pull-xs-right">
               <li className="nav-item">
                  <NavLink to="/" className="nav-link" exact>
                     Home
                  </NavLink>
               </li>
               <li className="nav-item">
                  <NavLink to="/login" className="nav-link">
                     Sign in
                  </NavLink>
               </li>
               <li className="nav-item">
                  <NavLink to="/register" className="nav-link">
                     Sign up
                  </NavLink>
               </li>
            </ul>
         </div>
      </nav>
   )
}
