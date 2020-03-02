import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useFetch } from '@/hooks/useFetch'
import Input from '@com/Input'
import Button from '@com/Button'
import classes from './Auth.module.scss'

export default function Auth() {
   const [email, setEmail] = useState<string>('')
   const [password, setPassword] = useState<string>('')
   const [{ isLoading, response, error }, doFetch] = useFetch('users/login')

   const handleSubmit = (event: React.FormEvent) => {
      event.preventDefault()
      doFetch({
         method: 'POST',
         data: {
            user: {
               email,
               password
            }
         }
      })
   }

   return (
      <div className={classes.auth}>
         <div className="container page">
            <div className="row">
               <div className="col md-6 col-xs-12">
               <h1 className="text-center">Login</h1>
                  <p className="text-sm-center">
                     <Link to="/register">Need an account?</Link>
                  </p>
                  <form onSubmit={handleSubmit}>
                     <fieldset style={{ margin: '0 auto', width: 400 }}>
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
                           Sign in
                        </Button>
                     </fieldset>
                  </form>
               </div>
            </div>
         </div>
      </div>
   )
}
