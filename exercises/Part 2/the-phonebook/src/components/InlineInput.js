import React from 'react';

const InlineInput = (props) => {
    return(
        <div className="inline-input">
            <span>{props.label}</span>
            <input 
                value={props.inputValue} 
                onChange={props.inputChangeHandle}
            />
        </div>
    );
};

export default InlineInput;
