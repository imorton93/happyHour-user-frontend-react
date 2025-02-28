import './App.css'
import NavBar from './components/Layout/Navbar'
import { UserLocationProvider } from './context/UserLocationProvider'
import Home from './pages/Home'
import { Route, Routes } from 'react-router-dom'

function App() {

  return (
    <>
      <UserLocationProvider>
        <NavBar/>
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </UserLocationProvider>
    </>
  )
}

export default App
