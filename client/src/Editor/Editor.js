import React from 'react'
import { Link } from 'react-router-dom'

import CreateCard from './CreateCard/CreateCard'
import EditCard from './EditCard/EditCard'
import Table from './Table/Table'
import Button from '../SharedElement/Button'
import useCard from "../hooks/useCard"

const Editor = ({
    editID, setEditID, edit, setEdit
}) => {

    const { cards, setCards } = useCard()

    return (
        <div className='flex md:flex-nowrap mb-0 flex-wrap flex-col mt-4 md:mt-6 w-auto'>
            <h1 className='text-center font-bold text-2xl md:text-3xl'>
                Editor
            </h1>
            <div className='md:h-auto md:mb-5 sm:h-auto flex flex-wrap justify-between w-auto mt-4 md:mt-8'>

                {/* To create a card */}
                {!edit &&
                    <div className='md:flex md:flex-col md:justify-center mx-auto'>
                        <CreateCard
                            cards={cards}
                            setCards={setCards}
                        />
                    </div>
                }

                {/* To edit a card */}
                {edit &&
                    <div className='md:flex md:flex-col md:justify-center mx-auto'>
                        <EditCard
                            cards={cards}
                            setCards={setCards}
                            editID={editID}
                            setEditID={setEditID}
                            setEdit={setEdit}
                        />
                    </div>
                }

                {/* To view cards in tabular format */}
                <div className='md:flex md:flex-col md:justify-center mt-7 mx-auto'>
                    <Table
                        cards={cards}
                        setCards={setCards}
                        setEditID={setEditID}
                        setEdit={setEdit}
                    />
                </div>
            </div>
            {/* To switch to viewer component */}
            <Link className='block mt-5 text-center mx-auto' to='/viewer'>
                <Button title='Switch to viewer mode' />
            </Link>
        </div>
    )
}

export default Editor