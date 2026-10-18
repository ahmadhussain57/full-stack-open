const BlogsRouter=require('express').Router()
const Blog=require('../models/Blogs')
const User=require('../models/users')
const jwt=require('jsonwebtoken')


const getTokenForm=request=>{
   const authorization=request.get('authorization')
   if (authorization&&authorization.startsWith('Bearer ')) {
    return authorization.replace('Bearer ','')
   }
   return null
}

BlogsRouter.get('/', async(request, response) => {
    const blogs= await Blog.find({}).populate('user',{username:1,name:1,id:1})
    response.json(blogs) 
  })


BlogsRouter.post('/', async(request, response) => {
  const body = request.body

const decodedToken=jwt.verify(getTokenForm(request),process.env.SECRET)

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
        author: body.auther,
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
   await Blog.findByIdAndDelete(request.params.id)
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