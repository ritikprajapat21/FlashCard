import React, { useState } from 'react'

import Card from '../../SharedElement/Card'

const ViewCard = ({ card }) => {

    const [back, setBack] = useState(false)

    return (
        <div onClick={() => setBack(!back)}>
            <Card
                className='flex items-center justify-center overflow-auto mb-6 md:mb-6 w-52 h-52 md:w-56 md:h-56 text-center'
                onClick={() => setBack(!back)}
            >
                <p className='font-bold text-2xl'>
                    {!back && card.front}
                    {back && card.back}
                </p>
            </Card>
        </div>
    )
}

export default ViewCard