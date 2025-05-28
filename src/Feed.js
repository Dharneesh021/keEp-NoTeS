import React from 'react'
import Post from './Post'

const Feed = ({posts , setPosts}) => {
  return (
    <>
            {posts.map((elemet)=>
              <Post 
                key={elemet.id}
                elemets={elemet}
            />
            )}
        </> 
  )
}

export default Feed
