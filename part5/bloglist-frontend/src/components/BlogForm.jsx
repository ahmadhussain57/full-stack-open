import { useState } from "react"

const BlogForm=({saveBlog})=>{
    const [title,setTitle]=useState('')
    const [author,setAuthor]=useState('')
    const [url,setUrl]=useState('')

    const handleBlog=e=>{
        e.preventDefault();
        saveBlog({title,author,url});
        setAuthor('');
        setTitle('');
        setUrl('');
    }
    return(
    

        <>
            <form onSubmit={handleBlog}>
                <div>
                    <label>
                        title:
                        <input 
                        type="text"
                        value={title}
                        onChange={({target})=>setTitle(target.value)}
                        />
                    </label>
                </div>
                <div>
                    <label>
                        author:
                        <input 
                        type="text"
                        value={author}
                        onChange={({target})=>setAuthor(target.value)}
                        />
                    </label>
                </div>
                <div>
                    <label>
                        url:
                        <input 
                        type="text"
                        value={url}
                        onChange={({target})=>setUrl(target.value)}
                        />
                    </label>
                </div>

                <button type="submit">create</button>
            </form>
        </>
    )
}
export default BlogForm