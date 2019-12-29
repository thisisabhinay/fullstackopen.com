import React, {useState} from 'react'
import Note from './components/Note';

const App = (props) => {
    // Setting up component's states
    const [notes, setNotes] = useState(props.notes);
    const [newNote, setNewNote] = useState("a new note...");
    const [showAll, setShowAll] = useState(true);

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

export default App;