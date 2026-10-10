const dummy=(blogs)=>{
    return 1
}
const totalLikes=(blogs)=>{
  return  blogs.reduce((sum,blog)=>{
        return sum+blog.likes
    },0)
};

const favoriteBlog=(blogs)=>{
   
 return  blogs.reduce((max,blog)=>{
        return max.likes>blog.likes?max:blog
    })
}


 const mostBlogs=(blogs)=>{
   
    if  (blogs.length===0)
        return null;


    let mostAuther={
        author:'',
        blogs:0
    }
    
     blogs.reduce((count,blog)=>{
        count[blog.author]=(count[blog.author]||0)+1

        if ((mostAuther.blog||0)<count[blog.author]){
                mostAuther.author=blog.author 
                 mostAuther.blogs=count[blog.author]
        }
        

        return count;
    },{})
    return mostAuther

 }

 const mostLikes=(blogs)=>{
    if (blogs.length===0) {
        return null
    }
    let topLikes={
        author:'',
        likes:0
    }

    blogs.reduce((countLikes,blog)=>{
        countLikes[blog.author]=(countLikes[blog.author]||0)+blog.likes

        if (countLikes[blog.author]>topLikes.likes) {
            topLikes.author=blog.author
            topLikes.likes=countLikes[blog.author]
        }
        return countLikes
    },{})

    return topLikes

 }

module.exports={
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlogs,
    mostLikes
}