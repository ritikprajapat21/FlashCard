import React from 'react'
import { PencilSquareIcon, TrashIcon } from '@heroicons/react/24/outline'

import Data from './Data/Data'
import useCard from '../../../hooks/useCard'
import useAuth from '../../../hooks/useAuth'

const Row = () => {

    const { cards, setCards, setEdit, setEditID } = useCard()
    const { auth } = useAuth()

    const deleteCard = (id) => {
        const newList = cards.filter(card => card.id !== id)
        setCards([...newList])
    }

    const setPublic = (id) => {
        const newList = cards.map(card => (card.id === id) ? { ...card, share: !card.public } : card)
        setCards([...newList])
    }

    const rows = cards.map(card => <tr key={card.id}>
        <Data
            data={card.front}
        />
        <Data
            data={card.back}
        />
        <Data>
            <div className='flex flex-row'>
                {/* Icon to edit card */}
                <PencilSquareIcon
                    className='h-6 w-6 mx-2 text-gray-700 cursor-pointer'
                    onClick={() => {
                        setEditID(card.id)
                        setEdit(true)
                    }}
                />

                {/* Icon to delete card */}
                <TrashIcon
                    className='h-6 w-6 mx-2 text-gray-700 cursor-pointer'
                    onClick={() => deleteCard(card.id)}
                />
            </div>
        </Data>
        <Data>
            <input
                type='checkbox'
                defaultChecked={card.share}
                className='cursor-pointer'
                onChange={() => setPublic(card.id)}
            />
        </Data>
        <Data>
            {card?.createdBy !== auth?.email ? card?.createdBy : 'You'}
        </Data>
    </tr >)

return rows

}

export default Row