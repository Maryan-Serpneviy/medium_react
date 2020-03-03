import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router } from 'react-router-dom'

import { CurrentUserProvider } from './context/currentUser'

import CurrentUserChecker from './components/CurrentUserChecker'
import Routes from './routes'
import Header from './components/Header'
import './assets/scss/main.scss'

const app = (
   <CurrentUserProvider>
      <CurrentUserChecker>
         <Router>
            <Header />
            <Routes />
         </Router>
      </CurrentUserChecker>
   </CurrentUserProvider>
)

ReactDOM.render(app, document.querySelector('#root'))
