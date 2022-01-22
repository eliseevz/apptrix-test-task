import React, {useEffect, useRef, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';
import {
    clearAutoComplete,
    getAutocompleteData,
    getIssuesData,
    getIssuesLoadingStatus,
    loadAutoCompleteData,
    loadIssueList
} from "../store/issues";
import Autocomplete from "react-autocomplete"
import {getUniqueListOfProjects} from "../utils/getUniqueListOfProjects";
import Table from "../components/table/Table";


const TaskPage = () => {

    const dispatch = useDispatch()

    const [search, setSearch] = useState("")
    const [filter, setFilter] = useState(null)
    const [filterOptions, setFilterOptions] = useState(["Не выбрано"])

    const issuesData = useSelector(getIssuesData())
    const [issues, setIssues] = useState(issuesData)

    const issueLoadingStatus = useSelector(getIssuesLoadingStatus())
    const autoCompleteData = useSelector(getAutocompleteData())

    useEffect(() => {
        if (issuesData.length === 0) {
            dispatch(loadIssueList())
        }
    }, [])

    useEffect(() => {
        setIssues(issuesData)
        const filterOptions = ["Default", ...getUniqueListOfProjects(issuesData)]
        setFilterOptions(filterOptions)
    }, [issuesData])

    const handleChange = (e) => {
        setSearch(e.target.value)
        if (e.target.value.length < 3 && autoCompleteData.length !== 0) {
            dispatch(clearAutoComplete())
        }
        if (e.target.value.length >= 2) {
            dispatch(loadAutoCompleteData(e.target.value))
        }
        if (e.target.value.length === 0) {
            setIssues(issuesData)
        }
    }

    const filterHandleChange = (e) => {
        setFilter(e.value)
        if (e.value === "Default") {
            setIssues(issuesData)
            return
        }
        setIssues(prevState => issuesData.filter(issue => issue.project.name === e.value))
    }

    const onSelectHandler = (val) => {
        setSearch(val)
        setFilter("Default")
        submitSearchHandler(val)
    }

    const submitSearchHandler = (value = null) => {
        if (value) {
            const newIssues = issuesData.filter(issue => issue.project.name.toLowerCase().includes(value.toLowerCase()))
            setIssues(newIssues)
            return
        }
        const newIssues = issuesData.filter(issue => issue.project.name.toLowerCase().includes(search.toLowerCase()))
        setIssues(newIssues)
    }

    if (issueLoadingStatus) {
        return <p>loading</p>
    }

    return (
        <div>
            <div className="mt-4 d-flex align-items-center">
                <Autocomplete
                    getItemValue={(item) => item.label}
                    items={autoCompleteData}
                    renderItem={(item, isHighlighted) =>
                        <div key={item.label} style={{ background: isHighlighted ? 'lightgray' : 'white' }}>
                            {item.label}
                        </div>
                    }
                    value={search}
                    onChange={handleChange}
                    onSelect={onSelectHandler}
                />
                <button onClick={() => submitSearchHandler()} className="btn btn-primary ms-2">
                    <i className="bi bi-search text-white"></i>
                </button>
                <Dropdown
                    className="ms-5 w-15"
                    options={filterOptions}
                    value={filter}
                    onChange={filterHandleChange}
                    placeholder="Выберите проект"
                />
            </div>
            <Table
                columns={["ID", "SUMMARY", "PROJECT NAME"]}
                data={issues}
                keyList={["id", "summary", ["project", "name"]]}
            />
        </div>
    );
};

export default TaskPage;
