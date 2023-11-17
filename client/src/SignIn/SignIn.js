import React from 'react'
import { useFormik } from 'formik'

import Card from "../SharedElement/Card"
import Input from "../SharedElement/Input"
import Button from "../SharedElement/Button"
import { Toaster, toast } from 'react-hot-toast'

const SignIn = () => {

  const validateSignIn = (values) => {
    const error = {}
    const emailre = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/

    if (!values.email) error.email = toast.error('Email required!')
    if (!emailre.test(values.email)) error.email = toast.error('Invalid email!')

    if (!values.password) error.password = toast.error('Password required!')
    if (values.password.length < 6) error.password = toast.error("Password must 6 character long")

    return error
  }

  const validateUser = ({ email, password }) => {
    console.log("User vaildated")
    console.log(email, password)
  }

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validateOnBlur: false,
    validateOnChange: false,
    validate: validateSignIn,
    onSubmit: async (values) => {
      await validateUser(values)
      values.email = ''
      values.password = ''
    }
  })

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