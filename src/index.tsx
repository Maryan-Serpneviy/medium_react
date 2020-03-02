import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router } from 'react-router-dom'
import Routes from './routes'
import Header from './components/Header'
import './assets/scss/main.scss'

const app = (
   <Router>
      <Header />
      <Routes />
   </Router>
)

ReactDOM.render(app, document.querySelector('#root'))
