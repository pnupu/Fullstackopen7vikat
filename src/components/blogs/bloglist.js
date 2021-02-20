import React from 'react'
import { useSelector } from 'react-redux'
import Blog from './blog'
import { Table } from 'react-bootstrap'



const Bloglist = () => {
  const blogs = useSelector(state => state.blogs)
  const sorted = blogs.sort((a, b) => {
    return a.likes < b.likes ? 1 : -1
  })



  return(
    <ul>
      <Table striped>
        <thead>
          <tr>
            <th>
                    Blog:
            </th>
            <th>
                    Author:
            </th>
          </tr>
        </thead>
        <tbody>
          {sorted.map(blog =>
            <Blog
              key={blog.id}
              blog={blog}
            />
          )}
        </tbody>
      </Table>

    </ul>
  )
}

export default Bloglist