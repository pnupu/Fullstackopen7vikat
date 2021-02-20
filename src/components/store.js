import { composeWithDevTools } from 'redux-devtools-extension'
import { createStore, combineReducers, applyMiddleware } from 'redux'
import blogReducer from '../reducers/blogReducer'
import NotificationReducer from '../reducers/notificationsReducer'
import userReducer from '../reducers/userReducer'
import userListReducer from '../reducers/userListReducer'
import thunk from 'redux-thunk'

const reducer = combineReducers({
  blogs: blogReducer,
  notifications: NotificationReducer,
  user: userReducer,
  userList: userListReducer

})

const Store = () => {
  const store = createStore(reducer, composeWithDevTools(applyMiddleware(thunk)))

  return store
}

export default Store