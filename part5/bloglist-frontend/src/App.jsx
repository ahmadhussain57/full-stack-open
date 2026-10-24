import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import LoginForm from './components/LogginForm'
import BlogForm from './components/BlogForm'
import Notification from './components/Notification'
import Toggleable from './components/Toggleable'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user,setUser]=useState(null)
  const [notification,setNotification]=useState(null)

const blogFoRef=useRef()
  
  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  useEffect(()=>{
    const loggedUser=window.localStorage.getItem('loggedUser')
    console.log(loggedUser)
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
    try {
    const user =await loginService.login(credentials)
    setUser(user)
    window.localStorage.setItem('loggedUser',JSON.stringify(user))
    console.log(user);
    } catch (error) {
      setNotification('username or password invalid')
      setTimeout(()=>{
        setNotification(null)
      },5000)
    }
  }


  const saveBlog=async(credenials)=>{
    try {
    console.log(credenials);
   const blog=await blogService.addBlog(credenials);
    setBlogs(blogs.concat(blog))
    setNotification(`blog add by ${user.username}`)
    blogFoRef.current.toggleVisible()
    setTimeout(()=>{
      setNotification(null)
    },5000)
    } catch (error) {
      setNotification('error in added')
       setTimeout(()=>{
      setNotification(null)
    },5000)
    }
  }
  if (!user) {
    return(
      <>
      <h3>{notification}</h3>
       <LoginForm onLogin={onlogin}/>
      </>
      )
  }
  return (
    <div>
      {user&&(
        <>
        <h3>welcome {user.username}</h3>
        <Notification notifi={notification}/>
        <p>you are logged in</p>
        <button onClick={logout}>logout</button>
        </>
      )}
      <Toggleable buttonName='creatBlog' ref={blogFoRef}>
          <BlogForm saveBlog={saveBlog}/>
      </Toggleable>
      <h2>blogs</h2>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )
}

export default App