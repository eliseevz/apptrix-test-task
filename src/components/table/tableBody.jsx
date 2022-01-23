import React from 'react';

const TableBody = ({data, keyList, onClickHandler = null, }) => {

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
            return <button onClick={() => key(dataItem.summary)}>timesheets</button>
        }
    }

    return (
        <tbody>
        {
            data.map( dataItem => {
                return <tr onClick={onClickHandler ? () => onClickHandler(dataItem.id) : null} key={dataItem.id}>
                    {
                        keyList.map(key => <th key={key} scope="row">
                            {
                                // !Array.isArray(key)
                                //     ? dataItem[key]
                                //     : chainArray(dataItem, key)
                                render(key, dataItem)

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
