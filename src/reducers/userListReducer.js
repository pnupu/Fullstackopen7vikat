import userService from '../services/users'

export const InitialUsers = () => {
  return async dispatch => {
    const users = await userService.getAll()
    dispatch({
      type: 'INITIALUSERS',
      data: users
    })
  }
}

const userListReducer = (state=[], action) => {
  switch (action.type){
  case 'INITIALUSERS':
    return action.data
  default:
    return state
  }
}

export default userListReducer