import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import Country from './components/Country';
import './index.css';

const App = () => {
    const [intialCountries, setIntialCountries] = useState([]);
    const [searchState, setSearchState] = useState('empty');
    const [countries, setCountries] = useState(intialCountries);

    const fetchData = () => {
        axios
            .get('https://restcountries.eu/rest/v2/all')
            .then(response => {
                // TODO: Need to find solution that doesn't effect
                // immutability of the state
                setIntialCountries(response.data);
                setCountries(response.data);
            });
    }

    const fetchCountry = (name) => axios.get(`https://restcountries.eu/rest/v2/name/${name}?fullText=true`);

    useEffect(fetchData , []);

    const onQueryChange = (event) => {
        const str = event.target.value.toUpperCase();
        if (str === '') {
            // TODO: Need to find solution that doesn't effect
            // immutability of the state
            setCountries(intialCountries);
            setSearchState('empty');
            return;
        }

        const result = intialCountries.filter(({name}) => name.toUpperCase().search(str) !== -1);
        if (result.length <= 10) {
            // TODO: Need to find solution that doesn't effect
            // immutability of the state
            setCountries(result);
            setSearchState(
                result.length === 1
                ? 'country'
                : 'show'
            );
            return;
        }

        setSearchState('error');
    }

    const showCountryDetail = (event) => {
        const name = (event.target.getAttribute('data-name'));
        fetchCountry(name)
            .then(response => {
                console.log(response);
                setCountries(response.data);
                setSearchState('country');
            });
    }

    const countriesList = () => countries.map((country) => {
        return  <p key={country.name}>
                    {country.name} &nbsp;
                    <button
                        data-name={country.name}
                        onClick={showCountryDetail}
                    >
                        Details
                    </button>
                </p>
    });

    const renderRequiredComponent = () => {
        switch(searchState) {
            case 'blank':
                return;
            case 'show':
                return countriesList();
            case 'error':
                return <p>Too many matches, specify another filter</p>
            case 'country':
                const {name, population, flag, capital, languages} = countries[0];
                return <Country
                            name={name}
                            languages={languages}
                            capital={capital}
                            population={population}
                            flag={flag}
                        />
        }
    }

    return(
        <>
            Find countries: &nbsp;
            <input onChange={onQueryChange} />
            <div>
                {renderRequiredComponent()}
            </div>
        </>
    );
}

ReactDOM.render(<App />, document.getElementById('root'));