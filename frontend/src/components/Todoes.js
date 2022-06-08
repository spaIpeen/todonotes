import React from 'react'


const TodoItem = ({todo}) => {
    return (
        <tbody>
            <tr>
                <td>{todo.text}</td>
                <td>{todo.is_active}</td>
                <td>{todo.created}</td>
                <td>{todo.updated}</td>
                <td>{todo.project}</td>
                <td>{todo.creator}</td>
            </tr>
        </tbody>
    )
}


const TodoList = ({todoes}) => {
    return (
        <table>
            <tbody>
                <tr>
                    <th>Text</th>
                    <th>Is active</th>
                    <th>Created</th>
                    <th>Updated</th>
                    <th>Project</th>
                    <th>Creator</th>
                </tr>
            </tbody>
            {todoes.map((todo) => <TodoItem key={todo.created.toString()} todo={todo} />)}
        </table>
    )
}


export default TodoList