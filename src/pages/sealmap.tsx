import React from 'react'
import { PrivateRoute } from '../components/Routes/PrivateRoute'

const Sealmap = () => {
  return (
    <PrivateRoute>
      <div>Seal Map</div>
    </PrivateRoute>
  )
}

export default Sealmap
