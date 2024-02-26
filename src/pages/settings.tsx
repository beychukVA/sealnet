import React from 'react'
import { PrivateRoute } from '../components/Routes/PrivateRoute'

const Settings = () => {
  return (
    <PrivateRoute>
      <div>Settings page</div>
    </PrivateRoute>
  )
}

export default Settings
