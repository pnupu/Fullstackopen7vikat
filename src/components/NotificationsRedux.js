import React from 'react'
import { useSelector } from 'react-redux'
import { Alert } from 'react-bootstrap'
const Notification = () => {
  const notification = useSelector(state => state.notifications)
  if(notification.content === null){
    return(
      <div>

      </div>
    )
  }
  return (
    <Alert variant={notification.color}>
      {notification.content}
    </Alert>
  )
}

export default Notification