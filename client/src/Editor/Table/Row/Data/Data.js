import React from 'react'

const Data = ({ data, children, colSpan, className }) => {
  return (
    <td
      className={`border hover:border-separate text-center p-2 border-slate-800 ${className}`}
      colSpan={colSpan || 0}
    >
      {data || null}
      {children || null}
    </td>
  )
}

export default Data