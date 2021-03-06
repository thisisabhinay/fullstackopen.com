import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import './index.css';

const Heading = ({text}) => (<h1>{text}</h1>);
const Button = ({onClick, label}) => (<button onClick={onClick}>{label}</button>);

const Anecdotes = (props) => {
    return(
        <>
            <Heading text={props.title} />
            <div className="action clearfix">
                <span className="votes">Votes: {props.votes[props.selected]}</span>
                <Button onClick={props.nextAnecdote} label="Next Anecdote" />
                <Button onClick={props.vote} label="Vote" />
            </div>
            <blockquote>
                {props.anecdotes[props.selected]}
            </blockquote>
        </>
    );
}

const PopularAnecdote = ({title, anecdote}) => {
    if (anecdote.vote === 0) return null;
    return(
        <>
            <Heading text={title} />
            <div className="action clearfix">
                <span className="votes">Votes: {anecdote.vote}</span>
            </div>
            <blockquote>
                {anecdote.text}
            </blockquote>
        </>
    );
}

const App = ({anecdotes}) => {
    const [selected, setSelected] = useState(0);
    const [votes, setVotes] = useState(anecdotes.map(() => 0));

    // Choose next anecdote to display
    const nextAnecdote = () => {
        const min = 0;
        const max = anecdotes.length - 1;
        const random = Math.floor(Math.random() * (max - min + 1)) + min;
        setSelected(random);
    };

    // Updates the vote of given anecdote
    const vote = () => {
        setVotes(
            votes.map((item, index) => {
                if(index === selected) return votes[selected] + 1;
                return item;
            })
        );
    }

    // Gets highest voted anecdote
    const getPopularAnecdote = () => ({
        text: anecdotes[votes.indexOf(Math.max(...votes))],
        vote: Math.max(...votes)
    });

    return(
        <>
            <Anecdotes 
                title="Anecdote of the day"
                votes={votes}
                anecdotes={anecdotes}
                selected={selected}
                vote={vote}
                nextAnecdote={nextAnecdote}
            />

            <hr />

            <PopularAnecdote 
                title="Anecdote with most votes"
                anecdote={getPopularAnecdote()}
            />
        </>
    );
}

const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
  ];

ReactDOM.render(<App anecdotes={anecdotes}/>, document.getElementById('root'));
