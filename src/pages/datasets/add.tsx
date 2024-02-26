import { AddDataset } from '../../components/AddDatasetSteps/AddDataset'
import { PrivateRoute } from '../../components/Routes/PrivateRoute'

const AddDatasets = () => {
  return (
    <PrivateRoute>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'flex-start',
          width: '100%',
          height: '100%',
          padding: '24px 0 41px 0',
        }}
      >
        <AddDataset />
      </div>
    </PrivateRoute>
  )
}

export default AddDatasets
