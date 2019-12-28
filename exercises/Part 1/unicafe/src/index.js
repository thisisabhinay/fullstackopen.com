import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import './index.css';

const Heading = ({text}) => (<h1>{text}</h1>);
const Button = ({onClick, label}) => (<button onClick={onClick}>{label}</button>);
const Stat = ({text, count}) => (<p>{text}: <strong>{count}</strong></p>);

const Statistics = (props) => {
    if(props.getTotalStats() === 0){
        return(
            <p>No feedback given</p>
        );
    }
    
    return(
        <>
            <Heading text="Statistics" />
            <Stat text="Good" count={props.good} />
            <Stat text="Neutral" count={props.neutral} />
            <Stat text="Bad" count={props.bad}  />
            <Stat text="All" count={props.getTotalStats()}  />
            <Stat text="Average" count={props.getAverageScore()}  />
            <Stat text="Positive %" count={props.getPositivePercentage()}  />
        </>
    );
}

const App = () =>{
    // Defining component's states with React hook
    const [good, setGood] = useState(0);
    const [neutral, setNeutral] = useState(0);
    const [bad, setBad] = useState(0);
    const [history, setHistory] = useState([]);

    // Setter function(s)
    const updateStat = (type) => {
        switch(type){
            case 'good' : 
                setGood(good + 1);
                setHistory(history.concat('g'));
                break;
            case 'neutral' : 
                setNeutral(neutral + 1);
                setHistory(history.concat('n'));
                break;
            case 'bad' : 
                setBad(bad + 1);
                setHistory(history.concat('b'));
                break;
        }
    }

    // Getter function(s)
    const getTotalStats = () => (good + neutral + bad);
    const getPositivePercentage = () => ((good / getTotalStats()) * 100).toFixed(2);
    const getAverageScore = () => {
        let sum = 0;
        const statMap = { 'g': 1, 'n': 0, 'b': -1 };

        history.forEach((item) => (sum += statMap[item])); 
        return (sum/history.length).toFixed(2);
    }

    return(
        <>
            <Heading text="Give Feedback" />
            <Button onClick={() => updateStat('good')} label="Good" />
            <Button onClick={() => updateStat('neutral')} label="Neutral" />
            <Button onClick={() => updateStat('bad')} label="Bad" />

            <hr />

            <Statistics 
                good={good}
                neutral={neutral}
                bad={bad}
                getTotalStats={getTotalStats}
                getAverageScore={getAverageScore}
                getPositivePercentage={getPositivePercentage}
            />
        </>
    );
}
ReactDOM.render(<App />, document.getElementById('root'));