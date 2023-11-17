import React from 'react'
import { Routes, Route } from 'react-router-dom'

import SignIn from './SignIn/SignIn'
import SignUp from './SignUp/SignUp'

function User() {
  return (
    <>
    {/* For signup page */}
      <Route
        path='/signup'
        element={<SignUp />}
      />

      {/* For signin page */}
      <Route
        path='/signin'
        element={<SignIn />}
      />
    </>
  )
}

export default User