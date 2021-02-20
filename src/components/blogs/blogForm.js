import React,  { useState } from 'react'
import { Notifications } from '../../reducers/notificationsReducer'
import { useDispatch } from 'react-redux'
import { Form, Button } from 'react-bootstrap'

const BlogForm = ({ createBlog }) => {
  const dispatch = useDispatch()


  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')
  const [likes, setLikes] = useState('')


  const handleblogcreation = (event) => {
    event.preventDefault()
    const notification = 'Created: ' + title
    dispatch(Notifications(notification, 5, 'success'))
    createBlog({
      title: title,
      author: author,
      url: url,
      likes: likes,
      comments: []
    })
    setUrl('')
    setAuthor('')
    setTitle('')
    setLikes('')
  }

  return (
    <div>
      <h2>Create new</h2>
      <Form onSubmit={handleblogcreation}>
        <br></br>
        <Form.Group>


          <div>
            <Form.Label>Title: </Form.Label>
            <Form.Control id='title' type="text" value={title} name="Title: " onChange={({ target }) => setTitle(target.value)}/>
          </div>
          <div>
            <Form.Label>Author: </Form.Label>

            <Form.Control id='author' type="text" value={author} name="Author: " onChange={({ target }) => setAuthor(target.value)}/>
          </div>
          <div>
            <Form.Label>Url: </Form.Label>

            <Form.Control id='url' type="text" value={url} name="Url: " onChange={({ target }) => setUrl(target.value)}/>
          </div>
          <div>
            <Form.Label>Likes: </Form.Label>

            <Form.Control id='likes' type="text" value={likes} name="Likes: " onChange={({ target }) => setLikes(target.value)}/>
          </div>
          <br></br>
          <Button variant="primary" id='submit' type="submit">create</Button>
        </Form.Group>
      </Form>
    </div>
  )
}

export default BlogForm