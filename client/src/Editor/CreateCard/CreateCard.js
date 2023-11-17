import React from 'react'
import { useFormik } from 'formik'
import { Toaster, toast } from 'react-hot-toast'

import Input from '../../SharedElement/Input'
import Button from '../../SharedElement/Button'
import Card from '../../SharedElement/Card'

const CreateCard = ({ cards, setCards }) => {

  /** To create a card */
  const validateInput = (values, error = {}) => {
    if (!values.front)
      error.front = toast.error('Front input is required')

    if (!values.back)
      error.back = toast.error('Back input is required')

    return error
  }

  /** To add a card */
  const addCard = ({ front, back }) => {
    const newCard = { id: (Math.random() * 100), front, back }
    const newCardList = [...cards, newCard]
    setCards(newCardList, console.log(cards))
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
            className='p-4 m-4'
            {...formik.getFieldProps('front')}
            placeholder='Front of the card'
          />

          <Input
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