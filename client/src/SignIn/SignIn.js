import React from 'react'
import { useFormik } from 'formik'
import { useNavigate, useLocation } from 'react-router-dom'

import Card from "../SharedElement/Card"
import Input from "../SharedElement/Input"
import Button from "../SharedElement/Button"
import { Toaster, toast } from 'react-hot-toast'
import useAuth from '../hooks/useAuth'
import axios from '../axios/axios'

const SignIn = () => {

  const { isLogin, setIsLogin, setAuth } = useAuth()
  const navigate = useNavigate()
  const from = useLocation() || '/'

  const handleSubmit = ({ email, password }) => {
    try {
      const response = axios.post('/user/auth',
        { email, password },
        {
          headers: { 'Content-Type': 'application/json' },
          withCredentials: true
        })

      toast.promise(response, {
        loading: 'Verifying...',
        success: 'Verified',
        error: 'Cannot verify... Check Credentials!'
      })

      response.then((data) => {
        console.log(data)

        setAuth({
          email: data.email,
          accessToken: data.accessToken
        })

        setIsLogin(true)

        // To navigate to editor or from user redirected
        from.pathname = from.pathname === '/signin' && '/'
        navigate(from, { replace: true })
      }).catch((err) => { throw err })

    } catch (err) {
      if (!err?.response) {
        toast.error('No server response')
      } else if (err.response?.status === 404) {
        toast.error('Username does not exist')
      } else if (err.response?.status === 400) {
        toast.error('Password does not match')
      } else {
        toast.error('Authentication failed')
      }
    }
  }

  const validateSignIn = (values) => {
    const error = {}
    const emailre = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/

    if (!values.email) {
      error.email = toast.error(<b>Email required!</b>)
      values.email = ''
    } else if (!emailre.test(values.email)) {
      error.email = toast.error(<b>Invalid email!</b>)
      values.email = ''
    }

    if (!values.password) {
      error.password = toast.error(<b>Password required!</b>)
      values.password = ''
    } else if (values.password.length < 6) {
      error.password = toast.error(<b>Password must 6 character long</b>)
      values.password = ''
    }

    return error
  }

  const formik = useFormik({
    initialValues: {
      email: 'ritiks@gmail.com',
      password: 'Ritik@123',
    },
    validateOnBlur: false,
    validateOnChange: false,
    validate: validateSignIn,
    onSubmit: (values) => {
      console.log(values)
      handleSubmit(values)
      values.email = ''
      values.password = ''
    }
  })

  if (isLogin) {
    return (
      <div className='block mx-auto'>
        <Card className='w-56 flex items-center p-4 h-52'>
          <p className='font-bold text-lg md:text-2xl'>
            You are already logged in.
          </p>
        </Card>
      </div>
    )
  }

  return (
    <div className='mx-auto h-1/2'>
      <Toaster position='top-center' reverseOrder={false}></Toaster>
      <Card className='w-fit'>
        <h1 className='text-xl mb-3'>Log In</h1>

        <form onSubmit={formik.handleSubmit}>
          <Input
            type='text'
            {...formik.getFieldProps('email')}
            placeholder='E-mail'
          />

          <Input
            type='password'
            {...formik.getFieldProps('password')}
            placeholder='Password'
          />

          <Button
            type='submit'
            className='mt-2'
          >
            Log in
          </Button>
        </form>
      </Card>
    </div>
  )
}

export default SignIn