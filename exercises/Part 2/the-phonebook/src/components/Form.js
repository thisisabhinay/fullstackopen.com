import React from 'react';
import Heading from '../components/Heading';
import Button from '../components/Button';
import InlineInput from '../components/InlineInput';

const Form = (props) => {
    return(
        <>
            <Heading text={props.text}/>
            <form onSubmit={props.onSubmit}>
                <InlineInput 
                    label="Name: "
                    inputValue={props.newName}
                    inputChangeHandle={props.newNameChange}
                />
                <InlineInput 
                    label="Phone No: "
                    inputValue={props.newNumber}
                    inputChangeHandle={props.newNumberChange}
                />
                <Button type="submit" label="Save" />
            </form>
        </>
    );
};

export default Form;
