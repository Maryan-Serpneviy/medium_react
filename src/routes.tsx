import React from 'react'
import { Switch, Route } from 'react-router-dom'
import GlobalFeed from './containers/globalFeed'
import Auth from './containers/auth'
import Article from './containers/article'

export default function Routes() {
   return (
      <Switch>
         <Route path="/" component={GlobalFeed} exact />
         <Route path="/login" component={Auth} />
         <Route path="/register" component={Auth} />
         <Route path="/articles/:slug" component={Article} />
      </Switch>
   )
}
