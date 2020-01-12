import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import noteService from './services/notes'
import Note from './components/Note';
import './index.css';

const App = () => {
    // Setting up component's states
    const [notes, setNotes] = useState([]);
    const [newNote, setNewNote] = useState('');
    const [showAll, setShowAll] = useState(true);

    // Effect Hook
    useEffect(() => {
        noteService
            .getAll()
            .then(intialNotes => setNotes(intialNotes));
    }, []);

    // Component functions
    const notesToShow = showAll
        ? notes
        : notes.filter((note) => note.important);

    const toggleImportanceOf = id => {
        const note= notes.find(n => n.id === id);
        const changedNote= {...note, important: !note.important}; // Toggles the importance of the note

        noteService
            .update(id, changedNote)
            .then(returnedNote => {
                setNotes(notes.map(note => note.id !== id ? note: returnedNote));
            })
            .catch(error => {
                alert(
                    `The note "${note.content}" was already deleted from the server.`
                );
                setNotes(notes.filter(n => n.id !== id));
            });
    }

    const rows = () => notesToShow.map((note) => 
        <Note 
            key={note.id} 
            note={note} 
            toggleImportance={() => toggleImportanceOf(note.id)}
        />
    );
    
    const handleNoteChange = (event) => setNewNote(event.target.value);
    
    const addNote = (e) => {
        e.preventDefault();
        const noteObject = {
            content: newNote,
            date: new Date().toISOString(),
            important: Math.random() > 0.5,
        }

        // Storing the new note on server
        noteService
            .create(noteObject)
            .then(returnedNote => {
                // Saving the newly created note into component's state
                setNotes(notes.concat(returnedNote));
                setNewNote('');
            });
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