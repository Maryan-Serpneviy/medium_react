import React, { useState, useEffect, useContext } from 'react'
import { Redirect } from 'react-router-dom'

import { useFetch } from '@/hooks/useFetch'
import { useLocalStorage } from '@/hooks/useLocalStorage'
import { CurrentUserContext } from '@/context/currentUser'
import { setAuthorized, logoutUser } from '@/context/actions/currentUser'
import { TOKEN_KEY } from '@/constants'

import BackendErrorMessages from '@com/BackendErrorMessages'
import Input from '@com/Input'
import Button from '@com/Button'

export default function Settings() {
   const [currentUserState, dispatch] = useContext(CurrentUserContext)
   const apiUrl = 'user'
   const [{ response, error }, doFetch] = useFetch(apiUrl)
   const [, setToken] = useLocalStorage(TOKEN_KEY)

   const [image, setImage] = useState<string>('')
   const [username, setUsername] = useState<string>('')
   const [bio, setBio] = useState<string>('')
   const [email, setEmail] = useState<string>('')
   const [password, setPassword] = useState<string>('')
   const [loggedOut, setLoggedOut] = useState<boolean>(false)

   const handleSubmit = (event: React.FormEvent): void => {
      event.preventDefault()

      doFetch({
         method: 'PUT',
         data: {
            user: {
               ...currentUserState.currentUser,
               image,
               username,
               bio,
               email,
               password
            }
         }
      })
   }

   const logout = (event: React.MouseEvent<HTMLButtonElement>): void => {
      event.preventDefault()
      setToken('')
      dispatch(logoutUser())
      setLoggedOut(true)
   }

   useEffect(() => {
      if (!currentUserState.currentUser) {
         return
      }
      setImage(currentUserState.currentUser.image)
      setUsername(currentUserState.currentUser.username)
      setBio(currentUserState.currentUser.bio)
      setEmail(currentUserState.currentUser.email)

   }, [currentUserState.currentUser])

   useEffect(() => {
      if (!response) {
         return
      }
      dispatch(setAuthorized(response.user))

   }, [response, dispatch])

   if (loggedOut) {
      return <Redirect to="/" />
   }

   return (
      <div className="settings-page">
         <div className="container page">
            <div className="row">
               <div className="col-md-6 offset-md-3 col-xs-12">
                  <h1 className="text-xs-center">
                     Your settings
                  </h1>
                  {error && <BackendErrorMessages backendErrors={error.errors} />}
                  <form onSubmit={handleSubmit}>
                     <fieldset>
                        <fieldset className="form-group">
                           <Input
                              value={image}
                              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setImage(e.target.value)}
                              className="form-control form-control-lg"
                              placeholder="Profile picture URL"
                           />
                        </fieldset>

                        <fieldset className="form-group">
                           <Input
                              value={username}
                              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setUsername(e.target.value)}
                              className="form-control form-control-lg"
                              placeholder="Username"
                           />
                        </fieldset>

                        <fieldset className="form-group">
                           <textarea
                              value={bio}
                              onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setBio(e.target.value)}
                              className="form-control form-control-lg"
                              placeholder="Short biography"
                              rows={8}
                           />
                        </fieldset>

                        <fieldset className="form-group">
                           <Input
                              value={email}
                              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
                              type="email"
                              className="form-control form-control-lg"
                              placeholder="Email"
                           />
                        </fieldset>

                        <fieldset className="form-group">
                           <Input
                              value={password}
                              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
                              type="password"
                              className="form-control form-control-lg"
                              placeholder="Password"
                           />
                        </fieldset>
                        <Button type="submit" className="btn btn-lg btn-primary pull-xs-right">
                           Update settings
                        </Button>
                     </fieldset>
                  </form>
                  <hr/>
                  <Button onClick={logout} className="btn btn-outline-danger">
                     Or click here to logout
                  </Button>
               </div>
            </div>
         </div>
      </div>
   )
}
