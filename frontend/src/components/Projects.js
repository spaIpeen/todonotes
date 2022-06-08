import React from 'react'


const ProjectItem = ({project}) => {
    return (
        <tbody>
            <tr>
                <td>{project.name}</td>
                <td>{project.link_to_git}</td>
                <td>{project.owners}</td>
            </tr>
        </tbody>
    )
}


const ProjectList = ({projects}) => {
    return (
        <table>
            <tbody>
                <tr>
                    <th>Name</th>
                    <th>Link to Git</th>
                    <th>Owners</th>
                </tr>
            </tbody>
            {projects.map((project) => <ProjectItem key={project.owners.toString()} project={project} />)}
        </table>
    )
}


export default ProjectList
