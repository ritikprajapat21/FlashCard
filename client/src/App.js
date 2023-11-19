import React, { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'

import Editor from './Editor/Editor'
import Viewer from './Viewer/Viewer'
import NavBar from './Shared/NavBar'
import Footer from './Shared/Footer'
import SignIn from './SignIn/SignIn'
import SignUp from './SignUp/SignUp'
import Missing from './Shared/Missing'

export default function App() {

  return (
    <div className='flex flex-col h-screen justify-between'>

      <Toaster position='top-center' reverseOrder={false}></Toaster>
      
      <BrowserRouter>

        <NavBar />
        
        <Routes>

          {/* For user to edit and create cards */}
          <Route path='/' element={<Editor />} />

          {/* To view cards */}
          <Route path='/viewer' element={<Viewer />} />

          {/* For signup page */}
          <Route path='/signup' element={<SignUp />} />

          {/* For signin page */}
          <Route path='/signin' element={<SignIn />} />

          <Route path='*' element={<Missing />} />

        </Routes>

        <Footer />
        
      </BrowserRouter>
    </div>
  )
}
