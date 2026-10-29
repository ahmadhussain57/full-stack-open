import axios from 'axios'
const baseUrl = '/api/blogs'
let token
const setToken=text => {
  token=`Bearer ${text}`
}
const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}
const addBlog=async(blogAdd) => {
  const config={
    headers:{ Authorization:token }
  }
  const response=await axios.post(baseUrl,blogAdd,config)
  return response.data
}
const updateBlog=async(newBlog) => {
  const response=await axios.put(`${baseUrl}/${newBlog.id}`,newBlog)
  return response.data
}

const deleteBlog=async(blogId) => {
  console.log(blogId)
  const config = {
    headers: { Authorization: token },
  }
  const response=await axios.delete(`${baseUrl}/${blogId}`,config)
  return response.status
}
export default { deleteBlog, getAll,addBlog,setToken,updateBlog }