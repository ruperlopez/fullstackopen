import React from 'react'

const Total = ({ course }) => (
  <h3>
    Total of {course.parts.reduce((total, part) => total + part.exercises, 0)}{' '}
    exercises
  </h3>
)

export default Total
