import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { Notifications } from '../../reducers/notificationsReducer'
import { votetoid, comment } from '../../reducers/blogReducer'
import { Button } from 'react-bootstrap'
import { deleteBlog } from '../../reducers/blogReducer'

const Blogpage = (blog) => {
  const [com, setCom] = useState('')

  const dispatch = useDispatch()
  const b = blog.blog
  const vote = (event) => {
    event.preventDefault()
    dispatch(votetoid(b))
    dispatch(Notifications(`you voted ${b.title}`, 4, 'success'))
  }
  const handeDelete = (event) => {
    event.preventDefault()
    if (window.confirm(`Delete blog ${b.title} by ${b.author}`)) {
      dispatch(deleteBlog(b))
      dispatch(Notifications(`${b.title} deleted.`, 4, 'warning'))
      window.location = '/'
    }
  }

  const commentH = (event) => {
    event.preventDefault()
    dispatch(comment(com, b))
    setCom('')
  }
  if(!blog || b === undefined){
    return null
  }
  return(
    <div>
      <h2>{b.title}</h2>
      <p>Author: {b.author}</p>
            Url: <a href={'https://'+b.url}>{b.url}</a>
      <p>Votes: {b.likes}</p>
      <div className="container">
        <Button id='vote' onClick={vote}><p>vote</p></Button>
        <Button variant="primary" id='delete' onClick={handeDelete}>delete</Button>

      </div>
      <h2>Comments:</h2>
      {b.comments.map((c,i) => <li key={i}> {c}</li>)}
      <p>Send a comment:</p>
      <form onSubmit={commentH}>
        <input id='comment' type='text' value={com} onChange={({ target }) => setCom(target.value)}/>
        <Button id='submit' type="submit">send</Button>
      </form>

    </div>
  )
}

export default Blogpage