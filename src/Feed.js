import React from 'react'
import Post from './Post'

const Feed = ({posts , setPosts}) => {
  return (
    <>
            {posts.map((element) => (
  <Post key={element.id} element={element} />
))}
        </> 
  )
}

export default Feed
