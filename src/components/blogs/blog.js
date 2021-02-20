import React from 'react'
import { Link } from 'react-router-dom'


const Blog = ({ blog }) => {




  return (
    <tr className='blog'>
      <th>
        <Link to={`/blogs/${blog.id}`} >{blog.title}</Link>
      </th>
      <th>
        {blog.author}
      </th>
    </tr>
  )
}

export default Blog