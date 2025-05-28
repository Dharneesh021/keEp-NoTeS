import React from 'react'
import { Link } from 'react-router-dom'

const Post = ({ element }) => {  
  return (
    <article className="post">
      <Link to={`post/${element.id}`}>
        <h2>{element.title}</h2>
        <p className='postDate'>{element.datetime}</p>
      </Link>
      <p className='postBody'>
        {element.body?.length <= 25 
          ? element.body 
          : `${element.body?.slice(0, 25)}...`}
      </p>
    </article>
  )
}

export default Post
