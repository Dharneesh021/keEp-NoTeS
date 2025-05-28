import React from 'react'
import { Link } from 'react-router-dom'

const Post = ({elemets}) => {
  
  return (
    <article className="post">
                <Link to={`post/${element.id}`}>
                      <h2>{elemets.title}</h2>
                      <p className='postDate'>{elemets.datetime}</p>
                </Link>
                <p className='postBody'>{(elemets.body).length <= 25 ? elemets.body : `${(elemets.body).slice(0,25)}...`}</p>
     </article>
  )
}

export default Post
