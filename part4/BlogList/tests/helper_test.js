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

module.exports={
    initialBlogs,
    blogsInDb
}