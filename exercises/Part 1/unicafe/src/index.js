import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import './index.css';

const Heading = ({text}) => (<h1>{text}</h1>);
const Button = ({onClick, label}) => (<button onClick={onClick}>{label}</button>);
const Stat = ({text, count}) => (<p>{text}: <strong>{count}</strong></p>);

const App = () =>{
    // Defining component's states with React hook
    const [good, setGood] = useState(0);
    const [neutral, setNeutral] = useState(0);
    const [bad, setBad] = useState(0);

    return(
        <>
            <Heading text="Give Feedback" />
            <Button onClick={() => setGood(good + 1)} label="Good" />
            <Button onClick={() => setNeutral(neutral + 1)} label="Neutral" />
            <Button onClick={() => setBad(bad + 1)} label="Bad" />

            <hr />
            <Heading text="Statics" />
            <Stat text="Good" count={good} />
            <Stat text="Neutral" count={neutral} />
            <Stat text="Bad" count={bad}  />
        </>
    );
}
ReactDOM.render(<App />, document.getElementById('root'));