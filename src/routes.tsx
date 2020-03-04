import React from 'react'
import { Switch, Route } from 'react-router-dom'
import GlobalFeed from './containers/GlobalFeed'
import TagFeed from './containers/TagFeed'
import Auth from './containers/Auth'
import Article from './containers/Article'

export default function Routes() {
   return (
      <Switch>
         <Route path="/" component={GlobalFeed} exact />
         <Route path="/tags/:slug" component={TagFeed} />
         <Route path="/login" component={Auth} />
         <Route path="/register" component={Auth} />
         <Route path="/articles/:slug" component={Article} />
      </Switch>
   )
}
