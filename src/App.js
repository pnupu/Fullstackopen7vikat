import React, { useState, useEffect, useRef  } from 'react'
import blogService from './services/blogs'
import Notification from './components/NotificationsRedux'
import { Notifications } from './reducers/notificationsReducer'
import { InitialBlogs } from './reducers/blogReducer'
import { InitialUsers } from './reducers/userListReducer'
import Togglable from './components/togglable'
import LoginForm from './components/users/loginform'
import Bloglist from './components/blogs/bloglist'
import BlogForm from './components/blogs/blogForm'
import './index.css'
import { useDispatch, useSelector } from 'react-redux'
import { login, logout } from './reducers/userReducer'
import Userss from './components/users/users'
import {
  Switch, Route, Link, useRouteMatch, useLocation
} from 'react-router-dom'
import User from './components/users/user'
import Blogpage from './components/blogs/blogpage'
import { Button, Navbar, Nav } from 'react-bootstrap'

const App = () => {
  const dispatch = useDispatch()
  const location = useLocation()
  const user = useSelector(state => state.user)
  const blogslist = useSelector(state => state.blogs)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [loginVisible, setLoginVisible] = useState(false)
  const BlogFormRef = useRef()
  const jsonUser = user
  const users = useSelector(state => state.userList)

  useEffect(() => {
    if(jsonUser){
      blogService.setToken(JSON.parse(jsonUser).token)
    }

  })

  useEffect(() => {
    dispatch(InitialBlogs())

  }, [dispatch])

  const Menu = () => {
    const padding = {
      paddingRight: 5
    }

    return(
      <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark" >
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav.Link href="#" as="span">
            <Link to="/" style={padding} >Blogs</Link>
          </Nav.Link>


          <Nav.Link href="#" as="span">
            <Link to="/users" style={padding} >Users</Link>
          </Nav.Link>
          <Nav.Link href="#" as="span">
            {jsonUser
              ? <em style={{ color: 'white' }}>{jsonUser.name} logged in </em>
              : <em style={{ color: 'white' }}> Hello! </em>
            }
          </Nav.Link>
          <Nav.Link href="#" as="span">
            {jsonUser
              ? <Nav.Link variant="primary" onClick={handleLogout}>logout</Nav.Link>
              : <Nav.Link onClick={() => setLoginVisible(true)}>log in</Nav.Link>
            }
          </Nav.Link>

        </Navbar.Collapse>

      </Navbar>
    )
  }

  useEffect(() => {
    dispatch(InitialUsers())
  }, [dispatch])

  const getBlogs = async () => {
    try {
      dispatch(InitialBlogs())

    } catch(error) {
      console.log('error getting blocks')
    }
  }


  const createBlog = async (BlogObject) => {
    try {
      const newblog = await blogService.put(BlogObject)
      console.log('new blog created', newblog)
      getBlogs()
      BlogFormRef.current.toggleVisibility()
      dispatch(Notifications('new blog created', 4, 'success'))
    } catch(error) {
      dispatch(Notifications('something went wrong with blog creation', 4, 'danger'))
    }
  }

  const blogFrom = () => {
    const hideWhenVisible = { display: location.pathname === '/' ? '' : 'none' }
    return(
      <div style={hideWhenVisible}>
        <Togglable buttonLabel='New blog' ref={BlogFormRef}>
          <BlogForm createBlog={createBlog} />
        </Togglable>
      </div>
    )

  }

  const handleLogin = async (event) => {
    event.preventDefault()
    console.log('logging in with', username, password)
    try {
      dispatch(login(username, password))

      setUsername('')
      setPassword('')

    } catch (error) {
      console.log(error)
      console.log('wrong credentials')
      dispatch(Notifications('Wrong username or password', 4, 'danger'))
    }

  }
  const loginFrom = () => {
    const hideWhenVisible = { display: loginVisible ? 'none' : '' }
    const showWhenVisible = { display: loginVisible ? '' : 'none' }

    return (
      <div>
        <div style={hideWhenVisible}>

        </div>
        <div style={showWhenVisible}>
          <LoginForm
            username={username}
            password={password}
            handleUsernameChange={({ target }) => setUsername(target.value)}
            handlePasswordChange={({ target }) => setPassword(target.value)}
            handleSubmit={handleLogin}
          />
          <Button variant="primary" onClick={() => setLoginVisible(false)}>hide</Button>
        </div>
      </div>
    )
  }

  const handleLogout = () => {
    dispatch(logout())
    dispatch(Notifications('Logged out', 4, 'secondary'))
  }
  const match = useRouteMatch('/users/:id')

  const userpage = match
    ? users.find(userp => userp.id === match.params.id)
    : null


  const matchBlog = useRouteMatch('/blogs/:id')

  const blogp = matchBlog
    ? blogslist.find(blog => blog.id === matchBlog.params.id)
    : null

  return (

    <div className="container">
      <h2>Blogs</h2>
      <Notification/>
      <Menu />
      {user === null ? loginFrom() : blogFrom()}
      <Switch>
        <Route path="/blogs/:id">
          <Blogpage blog={blogp}/>
        </Route>

        <Route path="/users/:id">
          <User user={userpage}></User>
        </Route>
        <Route path="/users">
          <Userss users={users}/>
        </Route>
        <Route path="/">
          <Bloglist/>
        </Route>
      </Switch>
    </div>
  )
}


export default App