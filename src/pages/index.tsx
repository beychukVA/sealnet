import { PrivateRoute } from '../components/Routes/PrivateRoute'

const Home = () => {
  return (
    <PrivateRoute>
      <div>Home</div>
    </PrivateRoute>
  )
}

export default Home
