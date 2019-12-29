import React, {useState} from 'react';
import ReactDOM from 'react-dom';
import Heading from './components/Heading';
import Button from './components/Button';
import InlineInput from './components/InlineInput';
import Item from './components/Item';
import './index.css';

const App = () => {
    const [ persons, setPersons] = useState([
        { name: 'Arto Hellas' , contact: '040-1234567', id: 1 }
    ]); 
    const [ newName, setNewName ] = useState('');
    const [ newNumber, setNewNumber ] = useState('');

    // Sync input entered with component inputs state
    const newNameChange = (event) => setNewName(event.target.value);
    const newNumberChange = (event) => setNewNumber(event.target.value);
    
    // Generates list of contacts in the state
    const contacts = () => {
		return persons.map((person, i) => 
            <Item 
                key={person.id} 
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
            contact: newNumber,
            created_on: new Date().toISOString(),
            id: persons.length + 1
        }

        setPersons(persons.concat(newPerson));
        setNewName('');
        setNewNumber('');
	};

    return(
        <>
            <Heading text="Phonebook" />
            <form onSubmit={onSubmit}>
                <InlineInput 
                    label="Name: "
                    inputValue={newName}
                    inputChangeHandle={newNameChange}
                />
                <InlineInput 
                    label="Phone No: "
                    inputValue={newNumber}
                    inputChangeHandle={newNumberChange}
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
