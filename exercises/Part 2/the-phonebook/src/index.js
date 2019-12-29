import React, {useState} from 'react';
import ReactDOM from 'react-dom';
import Heading from './components/Heading';
import Button from './components/Button';
import InlineInput from './components/InlineInput';
import Item from './components/Item';
import './index.css';

const App = () => {
    const [ persons, setPersons] = useState([
        { name: 'Arto Hellas' }
    ]); 
    const [ newName, setNewName ] = useState('');

    // Sync input entered with component's 'inputValue' state
    const inputChangeHandle = (event) => setNewName(event.target.value);
    
    // Generates list of contacts in the state
    const contacts = () => {
		return persons.map((person, i) => 
            <Item 
                key={i} 
                name={person.name} 
                contact={person.contact}
            />
        );
	};
    
    // Creates new contact
    const onSubmit = (event) => {
        event.preventDefault();

        // Checking if name is already present in the state. 
        // If yes then don't create new contact
        if(!!persons.filter((person) => person.name.toUpperCase() === newName.toUpperCase()).length){
            alert(`"${newName}" already exists in phonebook.`);
            return;
        };

        const newPerson = {
            name: newName,
            created_on: new Date().toISOString(),
            id: persons.length + 1
        }

        setPersons(persons.concat(newPerson));
        setNewName('');
	};

    return(
        <>
            <Heading text="Phonebook" />
            <form onSubmit={onSubmit}>
                <InlineInput 
                    label="Name: "
                    inputValue={newName}
                    inputChangeHandle={inputChangeHandle}
                />
                <Button type="submit" label="Save" />
            </form>
            <hr />
            <Heading text="Numbers" />
            <table>
                <tbody>
                    {contacts()}
                </tbody>
            </table>
        </>
    );
};

ReactDOM.render(<App />, document.getElementById('root'));
