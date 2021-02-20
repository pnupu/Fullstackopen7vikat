import loginService from '../services/login'
import blogService from '../services/blogs'



export const login = (username, password) => {

  return async dispatch => {
    try{
      await loginService
        .login({ username, password })
        .then(res => dispatch({
          type: 'LOGIN',
          data: res
        }))

    } catch(error){
      console.log(error)
    }

  }
}

export const logout = () => {
  window.localStorage.removeItem('loggedUser')
  return async dispatch => {
    dispatch({
      type: 'LOGOUT',
      data: null
    })
  }
}

const userReducer = (state = window.localStorage.getItem('loggedUser'), action) => {


  switch (action.type){
  case 'LOGIN':
    window.localStorage.setItem('loggedUser', JSON.stringify(action.data))
    console.log(action.data)
    blogService.setToken(action.data.token)
    state = action.data
    return state

  case 'LOGOUT':
    state = action.data
    return state

  default:
    return state
  }
}

export default userReducer