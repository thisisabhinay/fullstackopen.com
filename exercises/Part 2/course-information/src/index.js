import React from 'react'
import ReactDOM from 'react-dom'
import Course from './components/Course'
import './index.css'

const course = {
    name: "Half Stack application development",
    parts: [
        {
            name: "Fundamentals of React",
            exercises: 10
        },
        {
            name: "Using props to pass data",
            exercises: 7
        },
        {
            name: "State of a component",
            exercises: 14
        }
    ]
};

const App = () => {
    return(
        <Course course={course} />
    )
}

ReactDOM.render(<App/>, document.getElementById('root'));