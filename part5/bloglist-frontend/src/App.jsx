import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import LoginForm from './components/logginForm'

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
    }
  },[])

  const onlogin=async (credentials)=>{
    const user =await loginService.login(credentials)
    setUser(user)
    window.localStorage.setItem('loggedUser',JSON.stringify(user))
  }

  return (
    <div>
      {user&&(
        <>
        <h3>welcome {user.name}</h3>
        </>
      )}
      {!user&&<LoginForm onLogin={onlogin}/>}
      <h2>blogs</h2>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )
}

export default App