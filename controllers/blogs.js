const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/', (req, res) => {
  Blog.find({}).then(blogs => {
    res.json(blogs)
  })
})

blogsRouter.post('/', (req, res, next) => {
  const body = req.body

  if (body.title === undefined) {
    return res.status(400).json({
      error: 'title missing'
    })
  }

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes
  })

  blog.save().then(savedBlog => {
    res.json(savedBlog)
  })
    .catch(error => next(error))
})

module.exports = blogsRouter




