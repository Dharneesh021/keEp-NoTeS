import React from 'react'
import { Link, useParams } from 'react-router-dom'

const PostPage = ({posts , handleDelete} ) => {

  const {id} = useParams();
 const element = posts.find((element) => element.id.toString() === id);
  return (
    <main className='PostPage'>
      <article className="post">
        {element && 
          <>
              <h2>{element.title}</h2>
              <p className="postDate">
                {element.datetime}
              </p>
              <p className="postBody">
                {element.body}
              </p>
              {/* {console.log((typeof(Number(element.id))) ,typeof(element.id))} */}

              <Link to={`/edit/${element.id}`}><button className='editButton'>Edit Post</button></Link>
              <button onClick={() => handleDelete((element.id))} className='deleteButton'>
                Delete Post
              </button>
          </>
        }
        {!element &&
          <>
              <h2>Page Not Found</h2>
              <br />
              <p>Well, that's disappointing.</p>
              <br />
              <Link to='/'>Visit Home Page</Link>
          </>
        }
      </article>
        
    </main>
  )
}

export default PostPage
