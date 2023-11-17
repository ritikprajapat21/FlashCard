import React from 'react'
import { InformationCircleIcon } from '@heroicons/react/24/outline'
import { useFormik } from 'formik'
import { Toaster, toast } from 'react-hot-toast'

import Card from '../SharedElement/Card'
import Input from '../SharedElement/Input'
import Button from '../SharedElement/Button'

const SignUp = ({ isLogin }) => {

  const validateSignUp = (values) => {
    const error = {}
    const emailre = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/

    console.log(values)

    if (!values.name) error.name = toast.error('Name required')

    if (!values.email) error.email = toast.error('Email required')

    if (!emailre.test(values.email)) error.email = toast.error('Invalid email')

    if (!values.password) error.password = toast.error('Password required')

    if (values.password.length < 6) error.password = toast.error('Minimum 6 characters required')

    if (!values.rePassword) error.rePassword = toast.error('Re-enter password required')

    if (values.password !== values.rePassword) error.password = toast.error('Password does not match')

    return error
  }

  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      password: '',
      rePassword: ''
    },
    validate: validateSignUp,
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: (values) => {
      console.log(values)
      values.name = ''
      values.email = ''
      values.password = ''
      values.rePassword = ''
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
      <Card className='w-fit md:pt-4'>
        <h1 className='text-xl'>Create account</h1>
        <form onSubmit={formik.handleSubmit}>
          <Input
            type='text'
            {...formik.getFieldProps('name')}
            placeholder='First and last name'
          />

          <Input
            type='email'
            {...formik.getFieldProps('email')}
            placeholder='Email'
          />

          <Input
            type='password'
            {...formik.getFieldProps('password')}
            placeholder='Password'
          />
          <div className='flex flex-row mt-0 mb-2'>
            <InformationCircleIcon className="h-5 w-5 inline text-gray-800" />
            <p className='text-[12px] ml-1 inline text-center m-0 text-slate-500'>
              Password must be atleast 6 characters.
            </p>
          </div>

          <Input
            type='password'
            {...formik.getFieldProps('rePassword')}
            placeholder='Re-enter password'
          />

          <Button
            type='submit'
          >
            Register
          </Button>
        </form>
      </Card>
    </div>
  )
}

export default SignUp