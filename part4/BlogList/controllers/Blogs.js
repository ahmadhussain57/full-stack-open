const BlogsRouter=require('express').Router()
const Blog=require('../models/Blogs')


BlogsRouter.get('/', async(request, response) => {
    const blogs= await Blog.find({})
            response.json(blogs)

      
  })


BlogsRouter.post('/', async(request, response) => {
  const blog = new Blog(request.body)
  if (!blog.likes) {
    blog.likes=0
  }
  const result= await blog.save()
    response.status(201).json(result)
})

BlogsRouter.delete('/:id',async(request,response,next)=>{
   await Blog.findByIdAndDelete(request.params.id)
    response.status(204).end()
  })

module.exports=BlogsRouter