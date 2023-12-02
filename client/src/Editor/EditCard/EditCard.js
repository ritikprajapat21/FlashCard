import React, { createRef, useEffect } from 'react'
import { useFormik } from 'formik'
import { Toaster, toast } from 'react-hot-toast'

import Input from '../../SharedElement/Input'
import Button from '../../SharedElement/Button'
import Card from '../../SharedElement/Card'
import useCard from '../../hooks/useCard'

const EditCard = () => {

  const front = createRef()

  useEffect(() => {
    front.current.focus()
  }, [])

  const { cards, setCards, editID, setEditID, setEdit } = useCard()

  const oldCard = cards.find(card => card.id === editID)

  /** To validate input */
  const validateInput = (values, error = {}) => {
    if (!values.front)
      error.front = toast.error('Front input is required')

    if (!values.back)
      error.back = toast.error('Back input is required')

    return error
  }

  /** To edit the card */
  const editCard = ({ front, back }) => {
    // Creating the new card 
    const newCard = { ...oldCard, front, back, edited: true }
    // Updating list
    const newCardList = cards.map(card => card.id === editID ? newCard : card)

    setCards(newCardList, console.log(cards))
  }

  const formik = useFormik({
    initialValues: {
      front: oldCard.front,
      back: oldCard.back
    },
    validateOnChange: false,
    validateOnBlur: false,
    validate: validateInput,
    onSubmit: (values) => {
      editCard(values)
      values.front = ''
      values.back = ''
      setEdit(false)
      setEditID(null)
      return values
    }
  })

  return (
    <>
      <Toaster position='top-center' reverseOrder={false}></Toaster>
      <Card className='sm:p-10 md:p-16 md:mt-5'>
        <p className='text-center font-semibold text-md md:text-xl'>Edit your card</p>
        <form onSubmit={formik.handleSubmit}>
          <Input
            type='text'
            ref={front}
            className='p-4 m-4'
            {...formik.getFieldProps('front')}
            placeholder='Enter front of the card'
          />
          <Input
            type='text'
            className='p-4 m-4'
            {...formik.getFieldProps('back')}
            placeholder='Enter back of the card'
          />
          <Button
            className='my-2'
            title='Edit Card'
            type='submit'
          />
        </form>
      </Card>
    </>
  )
}

export default EditCard