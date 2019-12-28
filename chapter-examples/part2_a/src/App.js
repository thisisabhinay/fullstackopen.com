import React from 'react'
import Note from './components/Note';

const App = ({notes}) => {
    const rows = () => notes.map((note) => <Note key={note.id} note={note} />);
    console.log("Rendering App...");
    return(
        <>
            <h1>Notes</h1>
            <ul>
                {rows()}
            </ul>
        </>
    );
}

export default App;