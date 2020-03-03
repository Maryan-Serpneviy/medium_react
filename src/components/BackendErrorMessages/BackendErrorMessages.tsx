import React from 'react'
import classes from './BackendErrorMessages.module.scss'

type Props = {
   backendErrors: null | object
}

export default function BackendErrorMessages({ backendErrors }: Props) {
   const errorMessages = Object.keys(backendErrors).map(name => {
      const messages = backendErrors[name].join(' ')
      return `${name} ${messages}`
   })
   return (
      <ul className={classes.errors}>
         {errorMessages.map(msg => (
            <li key={msg}>{msg}</li>
         ))}
      </ul>
   )
}
