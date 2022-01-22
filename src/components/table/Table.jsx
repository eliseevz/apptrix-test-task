import React from 'react';
import TableHeader from "./tableHeader";
import TableBody from "./tableBody";

const Table = ({columns, data, keyList, onClickHandler = null}) => {
    return (
        <table className="table mt-3">
            <TableHeader
                columns={columns}
            />
            <TableBody
                data={data}
                keyList={keyList}
                onClickHandler={onClickHandler}
            />
        </table>
    );
};

export default Table;
