import React from 'react'
import {Link} from "react-router-dom";


const TodoItem = ({todo, deleteTodo}) => {
    return (
        <tbody>
            <tr>
                <td>{todo.text}</td>
                <td>{todo.project.name}</td>
                <td>{todo.creator}</td>
                <td>
                    <button onClick={()=>deleteTodo(todo.id)} type='button'>Delete</button>
                </td>
            </tr>
        </tbody>
    )
}


const TodoList = ({todoes, deleteTodo}) => {
    return (
        <table>
            <tbody>
                <tr>
                    <th>Text</th>
                    <th>Project</th>
                    <th>Creator</th>
                    <th></th>
                </tr>
            </tbody>
            {todoes.map((todo) => <TodoItem key={todo.created.toString()} todo={todo} deleteTodo={deleteTodo}/>)}
            <Link to='/todoes/create'>Create</Link>
        </table>
    )
}


export default TodoList