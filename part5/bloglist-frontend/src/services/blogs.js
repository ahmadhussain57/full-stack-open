import axios from 'axios'
const baseUrl = '/api/blogs'
let token;
const setToken=text=>{
  token=`Bearer ${text}`
}
const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}
const addBlog=async(blogAdd)=>{
  const config={
        headers:{Authorization:token}
    }
  const response=await axios.post(baseUrl,blogAdd,config)
  return response.data
}
export default { getAll,addBlog,setToken }