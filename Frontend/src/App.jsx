import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Signin from './Components/Signin'
import Register from './Components/Register'
import Tasks from './Components/Tasks'
import AddTask from './Components/AddTask'
import Layout from './Components/Layout'
import ProtectedRoute from './Components/ProtectedRoute'

function App() {

  return (
    <BrowserRouter>

      <Routes>
        <Route path='/Signin' element={<Signin />} />
        <Route path='/Register' element={<Register />} />

        <Route path='/' element={
          <ProtectedRoute>
            <Layout />
          </ProtectedRoute>} >
          <Route path='/' element={<Tasks />} />
          <Route path='/addTask' element={<AddTask />} />
        </Route>
      </Routes>

    </BrowserRouter>
  )
}

export default App
