import React from 'react';

const Weather = ({weather}) => {
    if( typeof weather !== undefined && weather.length === 0) return null;

    return(
        <div className="weather">
            <h1>Weather in {weather.request.query}</h1>
            <p>
                <strong>Temprature: </strong> &nbsp; 
                {`${weather.current.temperature} celsius`}
            </p>
            <img 
                src={weather.current.weather_icons[0]} 
                alt={`${weather.location.name}'s weather icon`} 
            />
            <p>
                <strong>Wind: </strong> &nbsp; 
                {`${weather.current.wind_speed} kph direction ${weather.current.wind_dir}`}
            </p>
        </div>
    );
}

export default Weather;