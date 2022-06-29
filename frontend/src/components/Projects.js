import React from 'react'
import {Link} from "react-router-dom";


const ProjectItem = ({project, deleteProject}) => {
    return (
        <tbody>
            <tr>
                <td>{project.name}</td>
                <td>{project.link_to_git}</td>
                <td>{project.owners}</td>
                <td>
                    <button onClick={()=>deleteProject(project.id)} type='button'>Delete</button>
                </td>
            </tr>
        </tbody>
    )
}


const ProjectList = ({projects, deleteProject}) => {
    return (
            <div>
            <table>
                <tbody>
                    <tr>
                        <th>Name</th>
                        <th>Link to Git</th>
                        <th>Owners</th>
                        <th></th>
                    </tr>
                </tbody>
                {projects.map((project) => <ProjectItem key={project.owners.toString()} project={project}
                                                        deleteProject={deleteProject}/>)}
            </table>
            <Link to='/projects/create'>Create</Link>
        </div>
    )
}


export default ProjectList
