import React from 'react'
import PropTypes from 'prop-types'
import { Button, Form } from 'react-bootstrap'
const loginForm = (props) => {
  return(
    <div>
      <h2>Log in to application</h2>
      <Form onSubmit={props.handleSubmit}>
        <Form.Group>
          <div>
            <Form.Label>Username: </Form.Label>

            <Form.Control id='username' type="text" value={props.username} name="username" onChange={props.handleUsernameChange}/>
          </div>
          <div>
            <Form.Label>Password: </Form.Label>
            <Form.Control id='password' type="text" value={props.password} name="password" onChange={props.handlePasswordChange}/>
          </div>
          <br/>
          <Button  id="login-button" type="submit">login</Button>
        </Form.Group>
      </Form>
    </div>
  )

}
loginForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  handleUsernameChange: PropTypes.func.isRequired,
  handlePasswordChange: PropTypes.func.isRequired,
  username: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired
}
export default loginForm