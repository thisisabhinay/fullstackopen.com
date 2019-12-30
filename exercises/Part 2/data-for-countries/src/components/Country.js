import React from 'react';
import Weather from '../components/Weather';

const Country = (props) => {
    const languages = () => props.languages.map(({name}) => <li key={name}>{name}</li>);

    return(
        <>
            <div className="country">
                <h1>{props.name}</h1>
                <p>
                    Capital: {props.capital}
                </p>
                <p>
                    Population: {props.population}
                </p>
                <h2>Languages</h2>
                <ul>
                    {languages()}
                </ul>
                <img src={props.flag} alt={`${props.name}'s flag`} />
            </div>
            <Weather weather={props.weather} />
        </>
    );
}

export default Country;