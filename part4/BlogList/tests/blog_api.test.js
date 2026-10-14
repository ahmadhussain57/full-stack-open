const assert=require('node:assert')
const {test,after,beforeEach, describe}=require('node:test')
const mongoose=require('mongoose')
const Blog=require('../models/Blogs')
const app=require('../app')
const superTest=require('supertest')
const helper =require('./helper_test')

const api=superTest(app)

describe('when there is initially some notes saved',()=>{

beforeEach(async()=>{
    await Blog.deleteMany({})
    await Blog.insertMany(helper.initialBlogs)
})


describe('test get all blogs',()=>{

test('blogs are returend as json',async()=>{
    await api
        .get('/api/blogs')
        .expect(200)
        .expect('Content-type',/application\/json/)
})

test('all blogs reterned',async()=>{
    const result=await api.get('/api/blogs')
    assert.strictEqual(result.body.length,helper.initialBlogs.length)
})

test('id is uniqe and it\'s a varable ',async()=>{
    const blogs =await api.get('/api/blogs')

    const oneBlog=blogs.body[0]

    assert.ok(oneBlog.id)
    assert.strictEqual(oneBlog._id, undefined)
})

})

describe('add a blog',()=>{

test('post api',async()=>{
    const blogToAdd = {
        title: 'new blog',
        author: 'Ahmad Hussain',
        url: 'https://example.com',
        likes: 10
    }
    await api
    .post('/api/blogs')
    .send(blogToAdd)
    .expect(201)
    .expect('Content-Type',/application\/json/)


    const blogsAtEnd=await helper.blogsInDb()
    assert.strictEqual( blogsAtEnd.length,helper.initialBlogs.length+1)
    const blogsTitle=blogsAtEnd.map(b=>b.title)    
    assert(blogsTitle.includes('new blog'))

})


test('likes property is missing',async()=>{
     const blogToAdd = {
        title: 'new blog',
        author: 'Ahmad Hussain',
        url: 'https://example.com',
    }
    const result=await api
    .post('/api/blogs')
    .send(blogToAdd)
    .expect(201)
    .expect('Content-Type',/application\/json/)
    assert.strictEqual(result.body.likes,0)
})

test(' title properties are missing',async()=>{
     const blogToAdd = {
        author: 'Ahmad Hussain',
        url: 'https://example.com',
        likes:0
    }

    await api
    .post('/api/blogs')
    .send(blogToAdd)
    .expect(400)
    .expect('Content-Type',/application\/json/)


})

test(' url properties are missing',async()=>{
     const blogToAdd = {
        title: 'new blog',
        author: 'Ahmad Hussain',
        likes:0
    }

    await api
    .post('/api/blogs')
    .send(blogToAdd)
    .expect(400)
    .expect('Content-Type',/application\/json/)


})
})

describe('delete a blog',()=>{
    test('delete a blog by "/api/blogs/:id" using delete method',async()=>{
        const blogs=await helper.blogsInDb()
        const idToDelete=blogs[0].id

        await api
        .delete(`/api/blogs/${idToDelete}`)
        .expect(204)

        const blogsAtEnd=await helper.blogsInDb()
        assert.strictEqual(blogsAtEnd.length,helper.initialBlogs.length-1)

        const ids=blogsAtEnd.map(b=>b.id)
        assert(!ids.includes(idToDelete))

    })

    test('delet a blog not exist',async()=>{
        const fakeId=123456

        await api
        .delete(`/api/blogs`)
        .expect(400)

    })
})



})

after(async()=>{
    await mongoose.connection.close()
})
