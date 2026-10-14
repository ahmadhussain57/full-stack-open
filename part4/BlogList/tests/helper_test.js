const Blog=require('../models/Blogs')


const initialBlogs=[
{
title:'palestine',
author:'ahmad hussain',
url:'xxx',
likes:5
},
{
title:'yamen',
author:'ahmad hussain',
url:'xxx',
likes:5
},
{
title:'germany',
author:'ahmad hussain',
url:'xxx',
likes:5
},
]



const blogsInDb=async()=>{
    const result=await Blog.find({})
    return result.map(n=>n.toJSON())
}

const createFakeId=async()=>{
     const fakeBlog=new Blog({
        title: 'fake blog',
        author: 'Ahmad Hussain',
        url: 'https://example.com',
        likes:0
    }) 

    const bodyOfFakeBlog=await fakeBlog.save()
    const fakeID=bodyOfFakeBlog.toJSON().id
    await Blog.findByIdAndDelete(fakeID)
    
    return fakeID
}

module.exports={
    initialBlogs,
    blogsInDb,
    createFakeId,
}