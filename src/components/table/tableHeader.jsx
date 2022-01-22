import React from 'react';

const TableHeader = ({columns, ...rest}) => {
    return (
        <thead>
        <tr>
            {
                columns.map(column => <th key={column} scope="col">{column}</th>)
            }
            {/*<th scope="col">ID</th>*/}
            {/*<th scope="col">NAME</th>*/}
            {/*<th scope="col">LOGIN</th>*/}
            {/*<th scope="col">EMAIL</th>*/}
        </tr>
        </thead>
    );
};

export default TableHeader;
