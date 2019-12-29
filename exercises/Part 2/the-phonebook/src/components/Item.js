import React from 'react';

const Item = ({name, contact}) => {
    return(
        <tr>
            <td>{name}</td>
            <td>{contact}</td>
        </tr>
    );
};

export default Item;
