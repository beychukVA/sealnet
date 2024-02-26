import React from 'react'
import { PrivateRoute } from '../components/Routes/PrivateRoute'

const Profile = () => {
  return (
    <PrivateRoute>
      <div>Profile page</div>
    </PrivateRoute>
  )
}

export default Profile
