import React from 'react'

import Row from "./Row/Row"
import Button from "../../SharedElement/Button"
import Card from "../../SharedElement/Card"
import Data from "./Row/Data/Data"
import useCard from '../../hooks/useCard'

const Table = () => {

  const { cards } = useCard();

  /** If no cards */
  if (!cards || cards.length === 0) {
    return (
      <Card className='w-30 h-40 flex items-center'>
        <p className='text-lg italic text-center text-slate-600 md:text-xl font-bold'>
          No cards to display...<br /> Create a card
        </p>
      </Card>
    )
  }

  return (
    <Card className='md:h-2/3 bg-transparent lg:h-80 md:overflow-auto'>
      <table className='table-fixed bg-transparent border-slate-500 border-collapse'>
        <thead>
          <tr>
            <Data className='font-semibold text-lg'>Front of the card</Data>
            <Data className='font-semibold text-lg'>Back of the card</Data>
            <Data className='font-semibold text-lg'>Action</Data>
            <Data className='font-semibold text-lg'>Want to make public?</Data>
          </tr>
        </thead>
        <tbody>
          <Row />
        </tbody>
        <tfoot>
          <tr>
            <Data className='p-2' colSpan={4}>
              <Button title='Save Cards' />
            </Data>
          </tr>
        </tfoot>
      </table>
    </Card>
  )
}

export default Table