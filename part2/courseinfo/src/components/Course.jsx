import React from 'react'
import Content from './Content'
import Header from './Header'
import Total from './Total'

const Course = ({ courses }) => {
  return (
    <>
      {courses.map((course) => (
        <div key={course.id}>
          <Header course={course} />
          <Content parts={course.parts} />
          <Total course={course}/> 
        </div>
      ))}
    </>
  )
}

export default Course
