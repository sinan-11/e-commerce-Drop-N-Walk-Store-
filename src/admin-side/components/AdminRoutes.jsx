import React from 'react'
import { Routes,Route } from 'react-router-dom'

import Dashboard  from  '../pages/Dashboard'
import AdminProducts from '../pages/AdminProducts'
import AdminOrders from '../pages/AdminOrders'
import Users from '../pages/Users'
import AddProducts from '../pages/AddProduct'
import AdminProtected from './AdminProtected'
import EditProducts from '../pages/EditProducts'
import AdminNavbar from './AdminNavbar'
function AdminRoutes() {

  return (

    <div>
      <AdminNavbar/>

      <Routes>
        
        <Route path='/dashboard' element={  <AdminProtected><Dashboard/></AdminProtected>}/>
        <Route path='/products' element={ <AdminProtected><AdminProducts/></AdminProtected>}/>
         <Route path="/products/add" element={ <AdminProtected><AddProducts /></AdminProtected>} />
        <Route path='/orders' element={ <AdminProtected><AdminOrders/></AdminProtected>}/>
         <Route path="/users" element={ <AdminProtected><Users /></AdminProtected>} />

         
         <Route path="/products/edit/:id" element={ <AdminProtected><EditProducts /></AdminProtected>}/>
          


        


      </Routes>
      
    </div>
  )
}

export default AdminRoutes
