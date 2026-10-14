const BlogsRouter=require('express').Router()
const Blog=require('../models/Blogs')


BlogsRouter.get('/', async(request, response) => {
 await Blog.find({})
    response.json(blogs)
  })


BlogsRouter.post('/', async(request, response) => {
  const blog = new Blog(request.body)
  if (!blog.likes) {
    blog.likes=0
  }
    await blog.save()
    response.status(201).json(result)
})

module.exports=BlogsRouter