import React, { useEffect, useRef } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'

import Editor from './Editor/Editor'
import Viewer from './Viewer/Viewer'
import NavBar from './Shared/NavBar'
import Footer from './Shared/Footer'
import SignIn from './SignIn/SignIn'
import SignUp from './SignUp/SignUp'
import Missing from './Shared/Missing'
import axios from './axios/axios'
import useCard from './hooks/useCard'

export default function App() {

  const { setCards } = useCard()
  const mounted = useRef(true)

  useEffect(() => {

    const fetchPublicCards = async () => {
      try {
        // Fetching public cards
        const response = await axios.get('/card/public')
        console.log(response.data.cards)

        setCards(prev => prev ? [...prev, ...response.data.cards] : [...response.data.cards])

      } catch (err) {
        console.error(err)
      }
    }

    mounted.current && fetchPublicCards()

    return () => mounted.current = false
  }, [])

  return (
    <div className='flex flex-col h-screen justify-between'>

      <Toaster position='top-center' reverseOrder={false}></Toaster>

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

    </div>
  )
}
