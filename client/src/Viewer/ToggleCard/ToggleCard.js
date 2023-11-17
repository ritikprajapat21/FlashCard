import React from 'react'
import { ArrowLeftIcon, ArrowRightIcon } from '@heroicons/react/24/outline'

import Button from '../../SharedElement/Button'

const ToggleCard = ({ nextCard, previousCard }) => {
  return (
    <div className='grid grid-cols-2 gap-2'>
      <Button onClick={previousCard}>
        <div className='inline-flex items-center'>
          <ArrowLeftIcon className='h-4 w-4 inline mr-2' />
          Previous Card
        </div>
      </Button>
      <Button onClick={nextCard}>
        <div className='inline-flex items-center'>
          NextCard
          <ArrowRightIcon className='h-4 w-4 inline ml-2' />
        </div>
      </Button>
    </div>
  )
}

export default ToggleCard