import React from 'react'
import Post from './Post'

const Feed = ({posts , setPosts}) => {
  return (
    <>
            {posts.map((elemets)=>
              <Post 
                key={elemets.id}
                elemets={elemets}
            />
            )}
        </> 
  )
}

export default Feed
