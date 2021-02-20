import blogService from '../services/blogs'



export const InitialBlogs = () => {
  return async dispatch => {
    const blogs = await blogService.getAll()
    dispatch({
      type: 'INITIALBLOGS',
      data: blogs
    })
  }
}

export const getBlogById = (id) => {
  return async dispatch => {
    const blog = await blogService.getBlog(id)
    dispatch({
      type: 'BLOGID',
      data: blog
    })

  }
}

export const comment = (comment, blog) => {
  return async dispatch => {
    const commentedB = { ...blog, comments: blog.comments.concat(comment) }
    await blogService.comment(commentedB, blog.id)

    dispatch({
      type: 'COMMENT',
      data: commentedB
    })
  }
}

export const votetoid = (blog) => {
  return async dispatch => {
    const votedBlog = { ...blog, likes: blog.likes + 1 }
    const updatedBlog = await blogService.update(votedBlog)

    dispatch({
      type: 'VOTE',
      data: {
        id: updatedBlog.id
      }
    })
  }
}

export const addBlog = (data) => {
  return async dispatch => {
    const newBlog = await blogService.newBlog(data)
    dispatch({
      type: 'NEW',
      data: newBlog
    })
  }
}

export const deleteBlog = (blog) => {
  return async dispatch => {
    await blogService.remove(blog.id)
    const blogs = await blogService.getAll()
    dispatch({
      type: 'REMOVE',
      data: blogs
    })
  }
}

const blogReducer = (state = [], action) => {

  switch (action.type){
  case 'INITIALBLOGS':
    return action.data

  case 'VOTE':
    const id = action.data.id
    const BlogToVote = state.find(b => b.id === id)
    const votedBlog = { ...BlogToVote, likes: BlogToVote.likes + 1 }
    return state.map(blog => blog.id !== id ? blog : votedBlog)

  case 'NEW':
    return [...state, action.data]

  case 'REMOVE':
    return action.data

  case 'BLOGID':
    return action.data

  case 'COMMENT':


    return state.map(blog => blog.id !== action.data.id ? blog : action.data)

  default:
    return state
  }
}

export default blogReducer