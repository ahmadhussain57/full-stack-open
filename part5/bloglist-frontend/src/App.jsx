import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import LoginForm from './components/LogginForm'
import BlogForm from './components/BlogForm'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user,setUser]=useState(null)


  
  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  useEffect(()=>{
    const loggedUser=window.localStorage.getItem('loggedUser')
    if(loggedUser){
      const user=JSON.parse(loggedUser)
      setUser(user)
      console.log(user);
      blogService.setToken(user.jsonwebtoken)
      
    }
  },[])

  const logout=()=>{
    window.localStorage.removeItem('loggedUser')
    setUser(null)
  }

  const onlogin=async (credentials)=>{
    const user =await loginService.login(credentials)
    setUser(user)
    window.localStorage.setItem('loggedUser',JSON.stringify(user))
  }


  const saveBlog=async(credenials)=>{
    console.log(credenials);
   const blog=await blogService.addBlog(credenials);
    setBlogs(blogs.concat(blog))
    
  }
  if (!user) {
    return(
       <LoginForm onLogin={onlogin}/>
      )
  }
  return (
    <div>
      {user&&(
        <>
        <h3>welcome {user.username}</h3>
        <p>you are logged in</p>
        <button onClick={logout}>logout</button>
        </>
      )}
      <BlogForm saveBlog={saveBlog}/>
      <h2>blogs</h2>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )
}

export default App