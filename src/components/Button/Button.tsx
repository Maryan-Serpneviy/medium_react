import React from 'react'
import PropTypes, { InferProps } from 'prop-types'
import classes from './Button.module.scss'

type Props = {
   className?: string
   disabled?: boolean
   type?: string
   onClick: () => void
   children: JSX.Element[] | JSX.Element
}

const Button: React.FC<Props> = (
   { className, type, disabled, onClick, children, ...props }
   : InferProps<typeof Button.propTypes>) => {

   let style = [classes.button]
   if (type) {
      style.push(type)
   }
   if (className) {
      style = [...style, ...className.split(' ')]
   }

   return (
      <button
         className={style.join(' ')}
         onClick={onClick}
         disabled={disabled}
      >
         {children}
      </button>
   )
}

Button.propTypes = {
   className: PropTypes.string,
   type: PropTypes.string,
   disabled: PropTypes.bool,
   onClick: PropTypes.func.isRequired
}

export default Button
