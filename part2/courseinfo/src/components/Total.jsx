import React from 'react'

const Total = ({ parts }) => (
  <h3>
    Total of {parts.reduce((sum, part) => sum + part.exercises, 0)}{' '} exercises
  </h3>
)

export default Total
