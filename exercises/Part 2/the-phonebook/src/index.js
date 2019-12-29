import React, {useState} from 'react';
import ReactDOM from 'react-dom';
import Item from './components/Item';
import Form from './components/Form'
import Contacts from './components/Contacts'
import Search from './components/Search';
import './index.css';

const App = () => {
    const [ persons, setPersons] = useState([
        { id: 1, name: 'Arto Hellas', number: '040-123456' },
        { id: 2, name: 'Ada Lovelace', number: '39-44-5323523' },
        { id: 3, name: 'Dan Abramov', number: '12-43-234345' },
        { id: 4, name: 'Mary Poppendieck', number: '39-23-6423122' }
    ]); 
    const [ newName, setNewName ] = useState('');
    const [ newNumber, setNewNumber ] = useState('');
    const [ beforeSearchData, setBeforeSearchData ] = useState(persons);

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
