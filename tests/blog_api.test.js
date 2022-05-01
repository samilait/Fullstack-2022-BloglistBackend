const mongoose = require('mongoose')
const supertest = require('supertest')
const helper = require('./test_helper')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')

beforeEach(async () => {
  await Blog.deleteMany({})
  await Blog.insertMany(helper.initialBlogs)
})

test('all blogs are returned', async () => {
  const response = await api.get('/api/blogs')

  expect(response.body).toHaveLength(helper.initialBlogs.length)
})

test('blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('blogs have id field', async () => {
  const response = await api.get('/api/blogs')

  const ids = response.body.map(r => r.id)

  expect(ids).toBeDefined()
})

test('a blog can be added', async () => {
  const newBlog = {
    title: 'test blog adding',
    author: 'Sami Laitinen',
    url: 'www.test.com',
    likes: 10
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const initialBlogs = await helper.blogsInDb()

  expect(initialBlogs).toHaveLength(helper.initialBlogs.length + 1)

  const titles = initialBlogs.map(b => b.title)
  expect(titles).toContain(
    'test blog adding'
  )

})

test('a blog added without likes returns 0 likes', async () => {

  const initialBlogs = await helper.blogsInDb()
  const zeroLikesAtStart = initialBlogs.filter(b => b.likes === 0)

  const newBlog = {
    title: 'test blog adding',
    author: 'Sami Laitinen',
    url: 'www.test.com',
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const blogsAtEnd = await helper.blogsInDb()
  const zeroLikesAtEnd = blogsAtEnd.filter(b => b.likes === 0)

  expect(zeroLikesAtEnd.length).toEqual(zeroLikesAtStart.length + 1)

})

test('a blog without title is not added', async () => {

  const newBlog = {
    author: 'Sami Laitinen',
    url: 'www.test.com',
    likes: 10
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(400)

  const initialBlogs = await helper.blogsInDb()

  expect(initialBlogs).toHaveLength(helper.initialBlogs.length)

})

test('a blog without url is not added', async () => {

  const newBlog = {
    title: 'test blog adding',
    author: 'Sami Laitinen',
    likes: 10
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(400)

  const initialBlogs = await helper.blogsInDb()

  expect(initialBlogs).toHaveLength(helper.initialBlogs.length)

})

test('a blog can be deleted', async () => {
  const initialBlogs = await helper.blogsInDb()
  const blogToDelete = initialBlogs[0]

  await api
    .delete(`/api/blogs/${blogToDelete.id}`)
    .expect(204)

  const blogsAtEnd = await helper.blogsInDb()

  expect(blogsAtEnd).toHaveLength(
    helper.initialBlogs.length - 1
  )

  const titles = blogsAtEnd.map(b => b.title)

  expect(titles).not.toContain(blogToDelete.title)
})

test('likes can be added to a blog', async () => {
  const blogsAtStart = await helper.blogsInDb()
  const blogToEdit = blogsAtStart[0]

  const newBlog = {
    title: blogToEdit.title,
    author: blogToEdit.author,
    url: blogToEdit.url,
    likes: blogToEdit.likes + 10
  }

  await api
    .put(`/api/blogs/${blogToEdit.id}`)
    .send(newBlog)
    .expect(200)
    .expect('Content-Type', /application\/json/)

  const blogsAfterUpdate = await helper.blogsInDb()
  const updatedLikes = blogsAfterUpdate.map(b => b.likes)
  let totalLikesUpdated = 0
  updatedLikes.forEach(l => {
    totalLikesUpdated += l
  })

  const initialBlogs = await helper.initialBlogs
  const startLikes = initialBlogs.map(b => b.likes)
  let totalLikesStart = 0
  startLikes.forEach(l => {
    totalLikesStart += l
  })

  expect(totalLikesUpdated).toEqual(totalLikesStart + 10)

})

afterAll(() => {
  mongoose.connection.close()
})