import { PrivateRoute } from '../../components/Routes/PrivateRoute'

const CleanDataset = () => {
  return (
    <PrivateRoute>
      <div>Clean Data</div>
    </PrivateRoute>
  )
}

export default CleanDataset
