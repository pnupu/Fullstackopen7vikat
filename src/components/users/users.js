import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { Table } from 'react-bootstrap'

const User = ({ user }) => {
  const num = user.blogs.length
  return (
    <tr>
      <td>
        <Link to={`/users/${user.id}`}>{user.name} </Link>
      </td>
      <td>
        {num}
      </td>

    </tr>
  )
}

const Users = () => {
  const users = useSelector(state => state.userList)
  return(
    <div>
      <h2>Users</h2>
      <Table striped>
        <thead>
          <tr>
            <th>
                        Username:
            </th>
            <th>
                        Blogs created:
            </th>
          </tr>
        </thead>
        <tbody>
          {users.map(user =>
            <User
              key={user.id}
              user={user}
            />
          )}
        </tbody>
      </Table>
    </div>
  )
}
export default Users