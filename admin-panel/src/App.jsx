import React from 'react'
import Navbar from './components/navbar/navbar'
import Sidebar from './components/sidebar/sidebar'
import { Route, Routes } from 'react-router-dom'
import AddItems from './pages/addItems/addItems'
import ListItems from './pages/listItems/listItems'
import OdersList from './pages/listOders/listOders'
import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function App() {
   const url = 'http://localhost:4000';

  return (
    <div> 
       <ToastContainer/>
      <Navbar/>
      <hr/>
      <div className="app-content">
        <Sidebar/>
        <Routes>
          <Route path='/add' element={<AddItems url={url}/>}/>
          <Route path='/list' element={<ListItems url={url}/>}/>
          <Route path='/orders' element={<OdersList url={url}/>}/>
        </Routes>
      </div>
    </div>
  )
}

export default App
