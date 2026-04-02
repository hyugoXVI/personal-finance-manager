import { Register } from './pages/Register.jsx'
import './components/Header.jsx'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Dashboard } from './pages/Dashboard.jsx'
import { Categories } from './pages/Categories.jsx'
import { Transactions } from './pages/Transactions.jsx'
import { Login } from './pages/Login.jsx'

function App() {


  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Dashboard />}></Route>
          <Route path='/transactions' element={<Transactions />}></Route>
          <Route path='/categories' element={<Categories />}></Route>
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={< Register />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
