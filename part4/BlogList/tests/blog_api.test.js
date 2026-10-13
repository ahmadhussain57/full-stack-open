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

test.only('all blogs reterned',async()=>{
    const result=await api.get('/api/blogs')
    assert.strictEqual(result.body.length,helper.initialBlogs.length)
})

after(async()=>{
    await mongoose.connection.close()
})