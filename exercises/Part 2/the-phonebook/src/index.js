import React, {useState, useEffect} from 'react';
import ReactDOM from 'react-dom';
import Item from './components/Item';
import Form from './components/Form'
import Contacts from './components/Contacts'
import Search from './components/Search';
import axios from 'axios';
import './index.css';

const App = () => {
    const [ persons, setPersons] = useState([]); 
    const [ newName, setNewName ] = useState('');
    const [ newNumber, setNewNumber ] = useState('');
    const [ beforeSearchData, setBeforeSearchData ] = useState(persons);

    // Using effect hok to fetch initial state from server
    useEffect(() => {
        axios
            .get('http://localhost:3001/persons')
            .then(response => {
                setPersons(response.data);
                setBeforeSearchData(response.data);
            })
    }, []);

    // Sync input entered with component inputs state
    const newNameChange = (event) => setNewName(event.target.value);
    const newNumberChange = (event) => setNewNumber(event.target.value);
    
    // Generates list of contacts in the state
    const contacts = () => {
		return persons.map((person) => 
            <Item 
                key={person.id} 
                name={person.name} 
                contact={person.number}
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
            number: newNumber,
            created_on: new Date().toISOString(),
            id: persons.length + 1
        }

        setPersons(persons.concat(newPerson));
        setBeforeSearchData(persons.concat(newPerson));
        setNewName('');
        setNewNumber('');
    };
    
    // Search functionality
    const search = (event) => {
        const str = event.target.value.toUpperCase();
        if(str === '') {
            setPersons(beforeSearchData);
            return;
        }

        const result = persons.filter(({name}) => name.toUpperCase().search(str) !== -1);
        setPersons(result);
    } 

    return(
        <>
            <Search
                text="Phonebook"
                onSearch={search}
            />
            <hr/>

            <Form
                text="Create New Contact"
                onSubmit={onSubmit}
                newName={newName}
                newNumber={newNumber}
                newNameChange={newNameChange}
                newNumberChange={newNumberChange}
            />
            <hr />

            <Contacts 
                text="Numbers"
                contacts={contacts() }
            />
        </>
    );
};

ReactDOM.render(<App />, document.getElementById('root'));
