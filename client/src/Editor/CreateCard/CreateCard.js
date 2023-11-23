import React, { createRef } from 'react'
import { useFormik } from 'formik'
import { Toaster, toast } from 'react-hot-toast'
import { v4 as uuid } from "uuid"

import Input from '../../SharedElement/Input'
import Button from '../../SharedElement/Button'
import Card from '../../SharedElement/Card'
import useCard from '../../hooks/useCard'
import useAuth from '../../hooks/useAuth'

const CreateCard = () => {

  const front = createRef()
  const back = createRef()

  const { cards, setCards } = useCard()
  const { auth } = useAuth()

  /** To add a card */
  const addCard = ({ front, back }) => {
    console.log(cards)
    const newCard = { id: uuid(), front, back, createdBy: auth?.email, share: false, new: true }
    setCards(prev => prev?.length ? [...prev, newCard] : [newCard])
  }

  /** To validate a card */
  const validateInput = (values, error = {}) => {
    if (!values.front) {
      error.front = toast.error('Front input is required')
      front.current.focus()
    }

    if (!values.back) {
      error.back = toast.error('Back input is required')
      back.current.focus()
    }

    return error
  }

  const formik = useFormik({
    initialValues: {
      front: '',
      back: ''
    },
    validateOnChange: false,
    validateOnBlur: false,
    validate: validateInput,
    onSubmit: (values) => {
      addCard(values)
      front.current.focus()
      values.front = ''
      values.back = ''
    }
  })

  return (
    <>
      <Toaster position='top-center' reverseOrder={false}></Toaster>
      <Card className='w-fit sm:p-10 md:p-16 md:mt-5'>
        <p className='text-center font-semibold text-md md:text-xl'>Create your card</p>
        <form onSubmit={formik.handleSubmit}>
          <Input
            type='text'
            ref={front}
            className='p-4 m-4'
            {...formik.getFieldProps('front')}
            placeholder='Front of the card'
          />

          <Input
            ref={back}
            type='text'
            className='p-4 m-4'
            {...formik.getFieldProps('back')}
            placeholder='Back of the card'
          />

          <Button
            className='my-2'
            title='Create Card'
            type='submit'
          />
        </form>
      </Card>
    </>
  )
}

export default CreateCard