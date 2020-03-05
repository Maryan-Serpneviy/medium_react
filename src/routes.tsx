import React from 'react'
import { Switch, Route } from 'react-router-dom'
import GlobalFeed from './containers/GlobalFeed'
import YourFeed from './containers/YourFeed'
import TagFeed from './containers/TagFeed'
import Auth from './containers/Auth'
import Article from './containers/Article'
import ArticleCreator from './containers/ArticleCreator'
import ArticleEditor from './containers/ArticleEditor'
import Settings from './containers/Settings'

export default function Routes() {
   return (
      <Switch>
         <Route path="/" component={GlobalFeed} exact />
         <Route path="/settings" component={Settings} />
         <Route path="/articles/new" component={ArticleCreator} />
         <Route path="/articles/:slug/edit" component={ArticleEditor} />
         <Route path="/feed" component={YourFeed} />
         <Route path="/tags/:slug" component={TagFeed} />
         <Route path="/login" component={Auth} />
         <Route path="/register" component={Auth} />
         <Route path="/articles/:slug" component={Article} />
      </Switch>
   )
}
