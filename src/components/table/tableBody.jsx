import React from 'react';

const TableBody = ({data, keyList, onClickHandler = null, role }) => {

    const chainArray = (data, keys) => {
        let result = null
        keys.forEach(key => {
            if (result) {
                result = result[key]
            } else {
                result = data[key]
            }
        })
        return result
    }

    const render = (key, dataItem) => {
        if (typeof key === "string") {
            return dataItem[key]
        }
        if (Array.isArray(key)) {
            return chainArray(dataItem, key)
        }
        if (typeof key === "function") {
            return <button key={dataItem.id + Math.random()} onClick={() => key(dataItem.summary)}>timesheets</button>
        }
    }

    return (
        <tbody>
        {
            data.map( dataItem => {
                return <tr
                    key={Math.random()}
                    onClick={onClickHandler ? () => onClickHandler(dataItem.id) : null}
                    role={role ? role : null}
                >
                    {
                        keyList.map(Ikey => <th key={Math.random()} scope="row">
                            {
                                render(Ikey, dataItem)
                            }
                        </th>)
                    }
                </tr>
            })
        }
        </tbody>
    );
};

export default TableBody;
