import React from 'react'
import Header from '../components/Header'
import Content from '../components/Content'
import Total from '../components/Total'

const Course = ({course}) => {
    let exercises = course.parts.map((part) => part.exercises);
    return(
        <div>
            <Header courseName={course.name} />
            <Content parts={course.parts} />
            <Total exercises={exercises} />
        </div>
    );
}

export default Course;