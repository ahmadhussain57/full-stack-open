const BlogsRouter=require('express').Router()
const Blog=require('../models/Blogs')
const User=require('../models/users')
const jwt=require('jsonwebtoken')



BlogsRouter.get('/', async(request, response) => {
    const blogs= await Blog.find({}).populate('user',{username:1,name:1,id:1})
    response.json(blogs) 
  })


BlogsRouter.post('/', async(request, response) => {
  const body = request.body
if(!request.token){
  return response.status(401).json({error:'token missing'})
}
let decodedToken
try{
 decodedToken=jwt.verify(request.token,process.env.SECRET)
}catch(error){
  return response.status(401).json({error:'token invalid'})
}

if (!decodedToken.id) {
  return response.status(401).json({error:'token invalid'})
}
const user=await User.findById(decodedToken.id)

  if (!body.likes) {
    body.likes=0
  }

  if(!user){
    return response.status(400).json({error:'userId missing or not valid'})
  }
  const blog=new Blog({
        title: body.title,
        author: body.author,
        url: body.url,
        likes: body.likes,
        user:user.id,
  })
  const result= await blog.save()

  user.blogs=user.blogs.concat(result.id)

  user.save()

  response.status(201).json(result)
})

BlogsRouter.delete('/:id',async(request,response,next)=>{

if(!request.token){
  return response.status(401).json({error:'token missing'})
}
let decodedToken
try{
  decodedToken=jwt.verify(request.token,process.env.SECRET)
}catch(error){
  return response.status(401).json({error:'token invalid'})
}
if (!decodedToken) {
  return response.status(401).json({error:'token invalid'})
}

const blog=await Blog.findById(request.params.id)
if(!blog){
  return response.status(404).json({error:'blog not found'})
}

if (blog.user.toString()!==decodedToken.id) {
  return response.status(401).json({error:'wrong user,you can delete just your blogs'})
}



   await blog.deleteOne()
    response.status(204).end()
  })


  BlogsRouter.put('/:id',async(request,response,next)=>{
      const body=request.body

      const newBlog=
        {
        title: body.title,
        author: body.auther,
        url: body.url,
        likes: body.likes
    }
      
    const result= await Blog.findByIdAndUpdate(request.params.id,newBlog,{new:true})

    if(!result){
      return response.status(404).end()
    }

    response.status(200).json(result)
  })

module.exports=BlogsRouter