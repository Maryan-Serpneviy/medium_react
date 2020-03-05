import React from 'react'
import PropTypes, { InferProps } from 'prop-types'
import classNames from 'classnames'
import { useFetch } from '@/hooks/useFetch'
import Button from '../Button'

type Props = {
   isFavorited: boolean
   favoritesCount: number
   articleSlug: string
}

const AddToFavorites: React.FC<Props> = (
   { isFavorited, favoritesCount, articleSlug } :
   InferProps<typeof AddToFavorites.propTypes>) => {

   const apiUrl = `articles/${articleSlug}/favorite`
   const [{ response }, doFetch] = useFetch(apiUrl)

   const favoritesCountWithResponse = response ?
      response.article.favoritesCount :
      favoritesCount

   const isFavoritedWithResponse = response ?
      response.article.favorited :
      isFavorited

   const handleLike = (event: React.MouseEvent<HTMLButtonElement>) => {
      event.preventDefault()
      doFetch({
         method: isFavorited ? 'DELETE' : 'POST'
      })
   }

   const buttonClasses = classNames({
      'btn': true,
      'btn-sm': true,
      'btn-primary': isFavoritedWithResponse,
      'btn-outline-primary': !isFavoritedWithResponse
   })
   
   return (
      <Button
         onClick={handleLike}
         className={buttonClasses}
         style={{ color: 'white' }}
      >
         <i className="ion-heart" />
         <span>
            &nbsp;
            {favoritesCountWithResponse}
         </span>
      </Button>
   )
}

AddToFavorites.propTypes = {
   isFavorited: PropTypes.bool.isRequired,
   favoritesCount: PropTypes.number.isRequired,
   articleSlug: PropTypes.string.isRequired
}

export default AddToFavorites
