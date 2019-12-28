import React from 'react'
import Header from '../components/Header'
import Content from '../components/Content'
import Total from '../components/Total'

const Course = ({course}) => {
    let exercises = course.parts.map((part) => part.exercises);
    return(
        <div className="course">
            <Header courseName={course.name} />
            <hr />
            <Content parts={course.parts} />
            <hr />
            <Total exercises={exercises} />
        </div>
    );
}

export default Course;