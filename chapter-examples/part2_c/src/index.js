import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import Note from './components/Note';
import './index.css';

const App = () => {
    // Setting up component's states
    const [notes, setNotes] = useState([]);
    const [newNote, setNewNote] = useState('');
    const [showAll, setShowAll] = useState(true);

    // Effect Hook
    useEffect(() => {
        console.log('effect...');
        axios
            .get('http://localhost:3001/notes')
            .then(response => {
                console.log('promise fulfilled', response);
                setNotes(response.data);
            });
    }, []);
    console.log('render', notes.length, 'notes')

    // Component functions
    const notesToShow = showAll
        ? notes
        : notes.filter((note) => note.important);

    const rows = () => notesToShow.map((note) => <Note key={note.id} note={note} />);
    
    const handleNoteChange = (event) => setNewNote(event.target.value);
    
    const addNote = (e) => {
        e.preventDefault();
        const noteObject = {
            content: newNote,
            date: new Date().toISOString(),
            important: Math.random > 0.5,
            id: notes.length + 1
        }

        // Saving the newly created note into component's state
        setNotes(notes.concat(noteObject));
        setNewNote('');
    }

    return(
        <>
            <h1>Notes</h1>
            <div className="form">
                <form onSubmit={addNote}>    
                    <input 
                        className="inline-input"
                        value={newNote} 
                        onChange={handleNoteChange}
                    />
                    <button type="submit">Save</button>
                </form>
                <button onClick={() => setShowAll(!showAll)}>
                    Show {showAll ? 'important' : 'all'}
                </button>
            </div>
            <ul>
                {rows()}
            </ul>
        </>
    );
}

ReactDOM.render(<App />, document.getElementById('root'));