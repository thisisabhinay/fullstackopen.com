import React, {useState} from 'react';
import ReactDOM from 'react-dom';

const Display = ({counter}) => <div>{counter}</div>
const Button = ({text, onClick}) => <button onClick={onClick}>{text}</button>

const App = (props) => {
    const [counter, setCounter] = useState(0);
    const setToValue = (value) => setCounter(value);
    
    return(
        <>
            <Display counter={counter} />
            <Button 
                onClick={() => setToValue(counter + 1)} 
                text="Plus" 
            />
            <Button 
                onClick={() => setToValue(0)} 
                text="Zero" 
            />
        </>
    );
}

ReactDOM.render(<App />, document.getElementById('root'));