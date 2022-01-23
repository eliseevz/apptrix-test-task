import React from 'react';
import TableHeader from "./tableHeader";
import TableBody from "./tableBody";

const Table = ({columns, data, keyList, onClickHandler = null, role = null}) => {
    return (
        <table className="table mt-3">
            <TableHeader
                columns={columns}
            />
            <TableBody
                data={data}
                keyList={keyList}
                onClickHandler={onClickHandler}
                role={role}
            />
        </table>
    );
};

export default Table;
