import React from 'react'
import ReactDOM from 'react-dom'

const App = () => {
    const course = "Half Stack application development";
    const part1 = {
        name: "Fundamentals of React",
        exercises: 10
    };
    const part2 = {
        name: "Using props to pass data",
        exercises: 7
    };
    const part3 = {
        name: "State of a component",
        exercises: 14
    };
    
    return(
        <div>
            <Header course={course} />
            <Content part={[part1, part2, part3]} exercises={[exercises1, exercises2, exercises3]} />
            <Total count={exercises1 + exercises2 + exercises3} />
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