let timer
const init = {
  content: 'Add or vote',
  color: 'primary'
}
export const Notifications = (content, time, color) => {
  clearTimeout(timer)
  return async dispatch => {
    dispatch({
      type: 'NOTIFICATION',
      data: {
        content: content,
        color: color
      }
    })
    timer = setTimeout(() => {
      dispatch({
        type: 'NOTIFICATION',
        data: {
          content: null,
          color: color
        }
      })
    }, (time * 1000) )
  }
}


const NotificationReducer = (state = init, action) => {
  switch (action.type) {
  case 'NOTIFICATION':
    return action.data
  default:
    return state
  }
}


export default NotificationReducer