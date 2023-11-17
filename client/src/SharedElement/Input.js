import React from 'react'

const Input = ({ type, placeholder, className, ...rest }) => {
    return (
        <input
            type={type}
            autoComplete='off'
            {...rest}
            className={`mt-1 md:my-3 md:text-lg hover:shadow-lg hover:shadow-indigo-400 block mx-auto w-auto px-3 py-2 bg-white border border-slate-300 placeholder:text-slate-700 rounded-md text-sm shadow-sm placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 ${className}`}
            placeholder={placeholder}
        />
    )
}

export default Input