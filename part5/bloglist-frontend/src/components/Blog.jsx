const Blog = ({ blog }) => {

  return(

  <div >
    <p>{blog.url}</p>
    <p>{blog.likes} <button>like</button></p>
    <p>{blog.author}</p>
  </div>  
  )
}



export default Blog