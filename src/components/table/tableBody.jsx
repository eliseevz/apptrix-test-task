import React from 'react';

const TableBody = ({data, keyList, onClickHandler = null, }) => {

    const chainArray = (data, keys) => {
        let result = null
        keys.forEach(key => {
            console.log(key)
            console.log(data[key])
            if (result) {
                result = result[key]
            } else {
                result = data[key]
            }
        })
        return result
    }

    return (
        <tbody>
        {
            data.map( dataItem => {
                return <tr onClick={onClickHandler ? () => onClickHandler(dataItem.id) : null} key={dataItem.id}>
                    {
                        keyList.map(key => <th key={key} scope="row">
                            {
                                !Array.isArray(key)
                                    ? dataItem[key]
                                    : chainArray(dataItem, key)
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
