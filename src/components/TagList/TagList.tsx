import React from 'react'
import PropTypes, { InferProps } from 'prop-types'

type Props = {
   tags: string[]
}

const TagList: React.FC<Props> = ({ tags }: InferProps<typeof TagList.propTypes>) => {
   return (
      <ul className="tag-list">
         {tags.map(tag => (
            <li key={tag} className="tag-default tag-pill tag-outline">
               {tag}
            </li>
         ))}
      </ul>
   )
}

TagList.propTypes = {
   tags: PropTypes.array.isRequired
}

export default TagList
