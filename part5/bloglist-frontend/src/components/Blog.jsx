import { useState } from 'react'

const Blog = ({ blog,saveBlog ,deletFun }) => {
  console.log(blog)
  const [thisBlog,setThisBlog]=useState(blog)
  const updateBlog=() => {
    const newBlog={
      ...thisBlog,
      likes:thisBlog.likes+1
    }
    setThisBlog(newBlog)
    saveBlog(newBlog)
  }
  const deleteBlog=() => {
    console.log(thisBlog.id)
    if(window.confirm(`remove blog ${thisBlog.title} by ${thisBlog.author}`)){
      deletFun(thisBlog.id)


    }
  }
  return(

    <div >
      <p>{thisBlog.url}</p>
      <p>{thisBlog.likes} <button onClick={updateBlog}>like</button></p>
      <p>{thisBlog.author}</p>
      <button onClick={deleteBlog} >delete</button>
    </div>
  )
}



export default Blog