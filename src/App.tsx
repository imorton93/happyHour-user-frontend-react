import './App.css'
import NavBar from './components/Layout/Navbar'
import { ThemeProvider } from './context/ThemeContext'
import { UserLocationProvider } from './context/UserLocationProvider'
import Home from './pages/Home'
import { Route, Routes } from 'react-router-dom'

function App() {

  return (
    <>
      <ThemeProvider>
      <UserLocationProvider>
        <NavBar/>
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </UserLocationProvider>
      </ThemeProvider>
    </>
  )
}

export default App
