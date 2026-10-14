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