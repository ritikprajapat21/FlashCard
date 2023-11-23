import React from 'react'
import { Link } from 'react-router-dom'

import Button from "../SharedElement/Button"

const Missing = () => {
    return (
        <div className='flex flex-col items-center justify-between text-3xl'>
            <p className='font-bold text-5xl my-2 text-slate-900'>Oops,</p>
            <p className='font-bold text-5xl my-2 text-slate-900'>404</p>
            <p className='font-bold text-5xl my-2 text-slate-900'>Page not found</p>
            <Link className='mt-[15px]' to='/'>
                <Button>
                    Go to editor
                </Button>
            </Link>
        </div>
    )
}

export default Missing