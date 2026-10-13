const assert=require('node:assert')
const {test,after,beforeEach, describe}=require('node:test')
const mongoose=require('mongoose')
const Blog=require('../models/Blogs')
const app=require('../app')
const superTest=require('supertest')
const helper =require('./helper_test')

const api=superTest(app)

beforeEach(async()=>{
    await Blog.deleteMany({})
    await Blog.insertMany(helper.initialBlogs)
})



test('blods are returend as json',async()=>{
    await api
        .get('/api/blogs')
        .expect(200)
        .expect('Content-type',/application\/json/)
})

test('all blogs reterned',async()=>{
    const result=await api.get('/api/blogs')
    assert.strictEqual(result.body.length,helper.initialBlogs.length)
})

test.only('id is uniqe and it\'s a varable ',async()=>{
    const blogs =await api.get('/api/blogs')

    const oneBlog=blogs.body[0]

    assert.ok(oneBlog.id)
    assert.strictEqual(oneBlog._id, undefined)
})

after(async()=>{
    await mongoose.connection.close()
})