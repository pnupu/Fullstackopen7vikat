import React from 'react'

const User = (user) => {
  if (!user || user.user === undefined) {
    return null
  }
  const blogs = user.user.blogs
  return(
    <div>
      {user.name}
      <h2>Added blogs</h2>
      {blogs.map(blog => <li key={blog.id}> {blog.title}</li>)}
    </div>
  )
}

export default User