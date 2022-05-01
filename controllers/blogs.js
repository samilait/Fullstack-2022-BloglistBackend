const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/', async (req, res) => {
  const blogs = await Blog.find({})
  res.json(blogs)
})

blogsRouter.post('/', async (req, res) => {
  const body = req.body

  if (body.title === undefined) {
    return res.status(400).json({
      error: 'title missing'
    })
  }

  if (body.url === undefined) {
    return res.status(400).json({
      error: 'url missing'
    })
  }

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes || 0
  })

  const savedBlog = await blog.save()
  res.status(201).json(savedBlog)
})

blogsRouter.delete('/:id', async (req, res) => {
  await Blog.findByIdAndDelete(req.params.id)
  res.status(204).end()
})

blogsRouter.put('/:id', async (req, res) => {
  const { title, author, url, likes } = req.body

  const blog = {
    title: title,
    author: author,
    url: url,
    likes: likes
  }

  const updatedBlog = await Blog.findByIdAndUpdate(req.params.id, blog,
    { new: true, runValidators: true }
  )

  console.log('updated', updatedBlog)

  res.json(updatedBlog)
})

module.exports = blogsRouter




