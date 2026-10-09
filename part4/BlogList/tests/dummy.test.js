const {test} =require('node:test')
const assert=require('node:assert')
const dummy=require('../utils/list_helper').dummy
const totalLikes=require('../utils/list_helper').totalLikes


test('dummy return one',()=>{
    assert.strictEqual(dummy([]),1)
})

test('total likes is 5',()=>{
    const blogs=[
        {
           
    "title": "saswky",
    "author": "ahmad",
    "url": "google.com",
    "likes": 5,
    "id": "6ac835af4a336447d42b20ab"
         } ,
           {
           
    "title": "saswky",
    "author": "ahmad",
    "url": "google.com",
    "likes": 5,
    "id": "6ac835af4a336447d42b20ab"
         } ,
           {
           
    "title": "saswky",
    "author": "ahmad",
    "url": "google.com",
    "likes": 5,
    "id": "6ac835af4a336447d42b20ab"
         } 
    ]

    assert.strictEqual(totalLikes(blogs),5)
})