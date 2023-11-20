import React from 'react'
import { PencilSquareIcon, TrashIcon } from '@heroicons/react/24/outline'

import Data from './Data/Data'
import useCard from '../../../hooks/useCard'

const Row = () => {
    
  const { cards, setCards, setEdit, setEditID } = useCard();

    const deleteCard = (id) => {
        const newList = cards.filter(card => card.id !== id)
        setCards([...newList])
    }

    const setPublic = (id) => {
        const newList = cards.map(card => (card.id === id) ? { ...card, public: !card.public } : card)
        setCards([...newList])
        console.log(newList)
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
                defaultChecked={card.public}
                className='cursor-pointer'
                onChange={() => setPublic(card.id)}
            />
        </Data>
    </tr>)

    return rows

}

export default Row