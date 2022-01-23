import React, {useEffect, useState} from 'react';
import youTrackService from "../services/youTrackService";
import history from "../utils/history";
import query from "query-string"
import Table from "../components/table/Table";

const TimeSheets = () => {

    const {location} = history
    const queryData = query.parse(location.search)
    const [data, setData] = useState(null)


    useEffect(async () => {
        const { data } = await youTrackService.get(`workItems?fields=author(login),issue(summary),duration(presentation)`, {
            params: {
                query: `summary:${queryData.summary}`,
            }
        })
        console.log(data, ' hello')
        const transformedData = transformDuration(data)
        setData(transformedData)
    }, [])

    const backHandleClick = () => {
        history.push("/tasks")
    }

    const transformDuration = (data) => {
        const newData = data.map(item => {
            const newTime = item.duration.presentation.split(" ")
            const transformTime = newTime.map(timeEl => parseInt(timeEl))
            console.log(transformTime)
            if (transformTime.length === 1) {
                return {
                    ...item,
                    duration: {
                        ...item.duration,
                        presentation: `${transformTime[0]} minutes`
                    }
                }
            } else {
                return {
                    ...item,
                    duration: {
                        ...item.duration,
                        presentation: `${transformTime[0]} hours ${transformTime[1]} minutes`
                    }
                }
            }
        })
        console.log(newData)
        return newData
    }

    return (
        data && <div>
            <button onClick={backHandleClick} className="btn btn-primary mt-4">Назад</button>
            <div className="mt-2">
                TimeSheets <strong>{queryData.summary}</strong>
            </div>
            <Table
                columns={["NAME", "TIME"]}
                data={data}
                keyList={ [["author","login"], ["duration", "presentation"]]}
            />
        </div>
    );
};

export default TimeSheets;
