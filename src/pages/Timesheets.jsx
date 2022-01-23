import React, {useEffect, useRef, useState} from 'react';
import youTrackService from "../services/youTrackService";
import history from "../utils/history";
import query from "query-string"
import Table from "../components/table/Table";
import Pdf from "react-to-pdf";
import {login} from "../store/auth";

const TimeSheets = () => {

    const {location} = history
    const queryData = query.parse(location.search)
    const [data, setData] = useState(null)
    const ref = useRef()

    useEffect(async () => {
        const { data } = await youTrackService.get(`workItems?fields=author(login),issue(summary),duration(presentation)`, {
            params: {
                query: `summary:${queryData.summary}`,
            }
        })
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
        return newData
    }

    const getOptionsForPDF = () => {

        if  (data.length > 10) {
            return {
                orientation: 'portrait',
                unit: 'cm',
                format: [10 + data.length, 20],
            }
        } else {
            return {
                orientation: 'landscape',
                unit: 'cm',
                format: [10 + data.length, 20],
            }
        }

    }

    return (
        data && <div >
            <div className="d-flex align-items-center mt-4 mb-3">
                <button onClick={backHandleClick} className="btn btn-primary me-3">Назад</button>
                <Pdf x={0} options={getOptionsForPDF()} targetRef={ref}
                     filename={`${queryData.summary}.pdf`}>
                    {({toPdf}) => <button className="btn btn-secondary" onClick={toPdf}>Generate Pdf</button>}
                </Pdf>
            </div>
            <div className="container row" >
                <div ref={ref} className="col-sm-6">
                    <div className="mt-2">
                        TimeSheets <strong>{queryData.summary}</strong>
                    </div>
                    <Table
                        columns={["NAME", "TIME"]}
                        data={data}
                        keyList={ [["author","login"], ["duration", "presentation"]]}
                    />
                    </div>
                </div>
        </div>
    );
};

export default TimeSheets;
