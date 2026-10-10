const {test} =require('node:test')
const assert=require('node:assert')
const dummy=require('../utils/list_helper').dummy
const totalLikes=require('../utils/list_helper').totalLikes
const favoriteBlog=require('../utils/list_helper').favoriteBlog
const mostBlogs=require('../utils/list_helper').mostBlogs
const mostLikes=require('../utils/list_helper').mostLikes





test('dummy return one',()=>{
    assert.strictEqual(dummy([]),1)
})
test('most liked blog', () => {
  const blogs = [
    {
      title: "saswky",
      author: "ahmad",
      url: "google.com",
      likes: 9,
      id: "6ac835af4a336447d42b20ab"
    },
    {
      title: "saswky",
      author: "ahmad",
      url: "google.com",
      likes: 7,
      id: "6ac835af4a336447d42b20ab"
    },
    {
      title: "saswky",
      author: "ahmad",
      url: "google.com",
      likes: 8,
      id: "6ac835af4a336447d42b20ab"
    }
  ]

  assert.deepStrictEqual(favoriteBlog(blogs), {
    title: "saswky",
    author: "ahmad",
    url: "google.com",
    likes: 9,
    id: "6ac835af4a336447d42b20ab"
  })
})

test('rturn {auther ahmad ,blogs 3}',()=>{
      const blogs = [
    {
      title: "saswky",
      author: "ahmad",
      url: "google.com",
      likes: 9,
      id: "6ac835af4a336447d42b20ab"
    },
    {
      title: "saswky",
      author: "ahmad",
      url: "google.com",
      likes: 7,
      id: "6ac835af4a336447d42b20ab"
    },
    {
      title: "saswky",
      author: "ahmad",
      url: "google.com",
      likes: 8,
      id: "6ac835af4a336447d42b20ab"
    }
  ]

    assert.deepStrictEqual(mostBlogs(blogs),
        {
  author: "ahmad",
  blogs: 3
}
    )
})


test('rturn {auther ahmad ,blogs 24}',()=>{
      const blogs = [
    {
      title: "saswky",
      author: "ahmad",
      url: "google.com",
      likes: 9,
      id: "6ac835af4a336447d42b20ab"
    },
    {
      title: "saswky",
      author: "ahmad",
      url: "google.com",
      likes: 7,
      id: "6ac835af4a336447d42b20ab"
    },
    {
      title: "saswky",
      author: "ahmad",
      url: "google.com",
      likes: 8,
      id: "6ac835af4a336447d42b20ab"
    }
  ]

    assert.deepStrictEqual(mostLikes(blogs),
        {
  author: "ahmad",
  likes: 24
}
    )
})