

export const getUniqueListOfProjects = (list) => {
    const namesArray = []
    list.forEach(issue => {
        if (!namesArray.includes(issue.project.name)) {
            namesArray.push(issue.project.name)
        }
    })
    return namesArray
}