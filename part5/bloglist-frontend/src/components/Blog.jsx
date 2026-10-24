import { useState } from "react"

const Blog = ({ blog,saveBlog }) => {
console.log(blog)
const [thisBlog,setThisBlog]=useState(blog)
const updateBlog=()=>{
  const newBlog={
    ...thisBlog,
    likes:thisBlog.likes+1
  }
  setThisBlog(newBlog)
  saveBlog(newBlog)
}
  return(

  <div >
    <p>{thisBlog.url}</p>
    <p>{thisBlog.likes} <button onClick={updateBlog}>like</button></p>
    <p>{thisBlog.author}</p>
  </div>  
  )
}



export default Blog