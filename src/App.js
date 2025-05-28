import { Routes , Route, useNavigate} from "react-router-dom";
import About from "./About";
import Footer from "./Footer";
import Header from "./Header";
import Home from "./Home";
import Missing from "./Missing";
import Nav from "./Nav";
import NewPost from "./NewPost";
import PostPage from "./PostPage";
import { useEffect, useState } from "react";
import { format } from 'date-fns'
import api from './api/posts'
import EditPost from "./EditPost";
import useWindowSize from "./Hooks/useWindowSize";
import useAxiosFetch from "./Hooks/useAxiosFetch";

function App() {
  
  const[posts , setPosts] = useState([])
  const [search , setSearch] = useState('')
  const [postTitle , setPostTitle] = useState('')
  const [postBody , setPostBody] = useState('')
  const [searchResult , setSearchResult] = useState([])
  const [editTitle , setEditTitle] = useState('')
  const [editBody , setEditBody] = useState('')
  const navigate = useNavigate();
  const {width} = useWindowSize();
  const {data , isLoading , fetchErrors} = useAxiosFetch('https://json-server-db-u875.onrender.com/posts' || process.env.REACT_APP_API_URL)


  // Fetch Data

  useEffect(()=>{
    setPosts(data)
  }, [data])


useEffect(() => {
  if (!Array.isArray(posts)) {
    setSearchResult([]);
    return;
  }

  const filtered = posts.filter((element) => {
    const title = element.title || "";
    const body = element.body || "";

    return (
      title.toUpperCase().includes(search.toUpperCase()) ||
      body.toUpperCase().includes(search.toUpperCase())
    );
  });

  setSearchResult(filtered.reverse());
}, [posts, search]);




  // NewPost Submit
  const handleSubmit = async (e) => {
  e.preventDefault();
  const datetime = format(new Date(), 'MMM dd, yyyy pp');
  const listItems = {
    title: postTitle,
    datetime,
    body: postBody,
  };
  try {
    const response = await api.post('/posts', listItems);
    const allPosts = [...posts, response.data];
    setPosts(allPosts);
    setPostTitle('');
    setPostBody('');
    navigate('/');
  } catch (err) {
    console.error("Error submitting post:", err.message);
  }
};


  // Edit Post
  const handleEdit = async(id)=>{
    const datetime = format(new Date() , 'MMM dd, yyyy pp')
    const updateItems = { id , title: editTitle , datetime , body: editBody}
    try{
      const response = await api.put(`/posts/${id}`, updateItems)
      setPosts(posts.map((element)=> element.id===id ? {...response.data} : element))
      setEditTitle('')
      setEditBody('')
      navigate('/')
    }catch(err){
      console.log(err)
    }
  }

  // Delete Post
  const handleDelete = async (id) => {
    try {
      // console.log(typeof(id) , id); // Should log 'number'
      await api.delete(`/posts/${id}`);
      const list = posts.filter((element) => element.id !== id);
      setPosts(list);
      navigate('/');
    } catch (err) {
      console.error(err.message);
    }
  };
  return (
    <div className="App">
      <Header title="KeEp NoTeS" width = {width}/>
        <Nav 
        search = {search}
        setSearch = {setSearch}
        />
        <Routes>
          <Route path="/" element={
            <Home
              posts = {searchResult}
              fetchErrors = {fetchErrors}
              isLoading = {isLoading}
            />}
          />
            <Route path="newpost" element = {<NewPost
              handleSubmit = {handleSubmit}
              postTitle = {postTitle}
              setPostTitle ={setPostTitle}
              setPostBody = {setPostBody}
              postBody ={postBody} />
            }/>
          <Route path="post">
            <Route path=":id" element = {<PostPage
              posts = {posts}
              handleDelete = {handleDelete}/>
            }/>
          </Route>
          <Route path="/edit/:id" element= {<EditPost
            posts = {posts}
            editTitle = {editTitle}
            editBody = {editBody} 
            setEditTitle = {setEditTitle} 
            setEditBody = {setEditBody} 
            handleEdit = {handleEdit}/>
          }/>
        <Route path="about" element = {<About/>}/>
        <Route path="*" element = {<Missing/>}/>
        </Routes>
      <Footer />
    </div>
  );
}

  export default App;
