
const dummy = (blogs) => {
  if (blogs === undefined) {
    return 1
  }
  return 1
}

const totalLikes = (blogs) => {
  if (blogs.length === 0) {
    return 0
  }

  let total = 0
  blogs.forEach(blog => {
    total += blog.likes
  })

  return total

}

const favoriteBlog = (blogs) => {
  if (blogs.length === 0) {
    return 0
  }

  let most = 0
  let favorite = ''
  blogs.forEach(blog => {
    if (blog.likes > most) {
      favorite = blog._id
      most = blog.likes
    }
  })

  const blog = blogs.filter(b => b._id === favorite)[0]

  const retBlog = {
    title: blog.title,
    author: blog.author,
    likes: blog.likes
  }

  return retBlog

}

const mostBlogs = (blogs) => {
  if (blogs.length === 0) {
    return 0
  }

  let most = blogs.filter(b => b.author === blogs[0].author).length
  let output = {
    author: blogs[0].author,
    blogs: most
  }

  let numOfBlogs = 0
  blogs.forEach(blog => {

    numOfBlogs = blogs.filter(b => b.author === blog.author).length

    if (numOfBlogs > most) {
      most = numOfBlogs
      output = {
        author: blog.author,
        blogs: numOfBlogs
      }

    }
  })

  return output

}

const mostLikes = (blogs) => {
  if (blogs.length === 0) {
    return 0
  }

  let authorBlogs = blogs.filter(b => b.author === blogs[0].author)
  let most = 0
  authorBlogs.forEach(b => {
    most += b.likes
  })

  let output = {
    author: blogs[0].author,
    likes: most
  }

  blogs.forEach(blog => {
    let totalLikes = 0
    authorBlogs = blogs.filter(b => b.author === blog.author)
    authorBlogs.forEach(b => {
      totalLikes += b.likes
    })

    if (totalLikes > most) {
      most = totalLikes
      output = {
        author: blog.author,
        likes: totalLikes
      }

    }
  })

  return output

}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes,
}
