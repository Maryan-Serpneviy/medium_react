import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useFetch } from '@/hooks/useFetch'
import Input from '@com/Input'
import Button from '@com/Button'
import classes from './Auth.module.scss'

export default function Auth(props) {
   const isLogin = props.match.path === '/login'
   const pageTitle = isLogin ? 'Sign in' : 'Sign up'
   const descriptionLink = isLogin ? '/register' : '/login'
   const descriptionText = isLogin ? 'Need an account?' : 'Have an account?'
   const apiUrl = isLogin ? 'users/login' : 'users'

   const [email, setEmail] = useState<string>('')
   const [password, setPassword] = useState<string>('')
   const [username, setUsername] = useState<string>('')
   const [{ isLoading, response, error }, doFetch] = useFetch(apiUrl)

   const handleSubmit = (event: React.FormEvent) => {
      event.preventDefault()

      const user = isLogin ? { email, password } : { email, password, username }
      doFetch({
         method: 'POST',
         data: { user }
      })
   }

   return (
      <div className={classes.auth}>
         <div className="container page">
            <div className="row">
               <div className="col md-6 col-xs-12">
               <h1 className="text-center">{pageTitle}</h1>
                  <p className="text-sm-center">
                     <Link to={descriptionLink}>{descriptionText}</Link>
                  </p>
                  <form onSubmit={handleSubmit}>
                     <fieldset style={{ margin: '0 auto', width: 400 }}>
                        {!isLogin && (
                           <fieldset className="form-group">
                              <Input
                                 value={username}
                                 onChange={(e: React.ChangeEvent<HTMLInputElement>) => setUsername(e.target.value)}
                                 className="form-control form-control-lg"
                                 type="text"
                                 placeholder="Username"
                              />
                           </fieldset>
                        )}

                        <fieldset className="form-group">
                           <Input
                              value={email}
                              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
                              className="form-control form-control-lg"
                              type="email"
                              placeholder="Email"
                           />
                        </fieldset>

                        <fieldset className="form-group">
                           <Input
                              value={password}
                              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
                              className="form-control form-control-lg"
                              type="password"
                              placeholder="Password"
                           />
                        </fieldset>

                        <Button
                           className="btn btn-lg btn-primary pull-xs-right"
                           disabled={isLoading}
                        >
                           {pageTitle}
                        </Button>
                     </fieldset>
                  </form>
               </div>
            </div>
         </div>
      </div>
   )
}
