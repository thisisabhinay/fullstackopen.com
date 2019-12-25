import React from 'react'
import ReactDOM from 'react-dom'

const App = () => {
    const course = "Half Stack application development";
    const parts = [
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
    ];
    
    return(
        <div>
            <Header course={course} />
            <Content parts={parts} />
            <Total parts={parts} />
        </div>
    );
}

const Content = (props) => {
    return(
        <div>
            <Part part={props.part[0]} exercises={props.exercises[0]} />
            <Part part={props.part[1]} exercises={props.exercises[1]} />
            <Part part={props.part[2]} exercises={props.exercises[2]} />
        </div>
    );
}

const Header = (props) => {
    return(
        <h1>{props.course}</h1>
    );
}

const Part = (props) => {
    return(
        <p>
            {props.part} --> {props.exercises}
        </p>
    );
}

const Total = (props) => {
    return(
        <p>
           No. of exercises: {props.count}
        </p>
    );
}

ReactDOM.render(<App/>, document.getElementById('root'));