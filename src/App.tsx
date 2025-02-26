import { Navbar } from 'react-bootstrap'
import './App.css'
import Home from './pages/Home'
import { Route, Routes } from 'react-router-dom'

function App() {

  return (
    <>
      <Navbar bg="dark" variant="dark" className='p-2'>
        <Navbar.Brand className='pl-3' href="#">Vancity Happy Hour</Navbar.Brand>
      </Navbar>
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </>
  )
}

export default App
