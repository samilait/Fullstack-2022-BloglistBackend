const listHelper = require('../utils/list_helper')

describe('total likes', () => {
  const listWithOneBlog = [
    {
      _id: '5a422aa71b54a676234d17f8',
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
      likes: 5,
      __v: 0
    }
  ]

  const biggerList = [
    {
      title: 'Jokin Blogi',
      author: 'Sami Laitinen',
      url: 'www.sami.me',
      likes: 2,
      _id: '625dc0630e7d365343adb192',
      _v: 0
    },
    {
      title: 'Jonkun toisen Blogi',
      author: 'Jaska Jokunen',
      url: 'www.jaska.be',
      likes: 5,
      _id: '6263bab40c990714f41e4b45',
      _v: 0
    }
  ]

  test('of empty list is zero', () => {
    const result = listHelper.totalLikes([])
    expect(result).toBe(0)
  })

  test('when list has only one blog equals the likes of that', () => {
    const result = listHelper.totalLikes(listWithOneBlog)
    expect(result).toBe(5)
  })

  test('of a bigger list is calculated right', () => {
    const result = listHelper.totalLikes(biggerList)
    expect(result).toBe(7)
  })

})