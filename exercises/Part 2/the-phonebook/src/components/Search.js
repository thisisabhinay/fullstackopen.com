import React from 'react';
import Heading from '../components/Heading';
import InlineInput from '../components/InlineInput';

const Search = ({text, onSearch}) => {
    return(
        <>
            <Heading text={text} />
            <InlineInput 
                label="Search: "
                inputChangeHandle={onSearch}
            />
        </>
    );
};

export default Search;
