import React from 'react';
import Heading from '../components/Heading';

const Contacts = ({text, contacts}) => {
    return(
        <>
            <Heading text="Numbers" />
            <table>
                <tbody>
                    {contacts}
                </tbody>
            </table>
        </>
    );
};

export default Contacts;
