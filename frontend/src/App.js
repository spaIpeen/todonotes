import React from 'react';
import axios from "axios";
import Cookies from 'universal-cookie';
import {BrowserRouter, Link, Route, Routes} from "react-router-dom";
import './logo.svg';
import './App.css';
import UserList from './components/Users.js'
import ProjectList from './components/Projects.js'
import TodoList from './components/Todoes.js'
import MenuItem from "./components/Menu";
import FooterItem from "./components/Footer";
import LoginForm from "./components/Auth";
import ProjectForm from "./components/ProjectForm";
import TodoForm from "./components/TodoForm";


class App extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            'users': [],
            'projects': [],
            'todoes': [],
        }
    }

    set_token(token) {
        const cookies = new Cookies()
        cookies.set('token', token)
        this.setState({'token': token}, ()=>this.load_data())
    }

    is_authenticated() {
        return this.state.token !== ''
    }

    logout() {
        this.set_token('')
    }

    get_token_from_storage() {
        const cookies = new Cookies()
        const token = cookies.get('token')
        this.setState({'token': token}, ()=>this.load_data())
    }

    get_token(username, password) {
        axios.post('http://127.0.0.1:8000/api-token-auth/', {username: username, password: password})
        .then(response => {
            this.set_token(response.data['token'])
        }).catch(error => alert('Неверный логин или пароль'))
    }

    get_headers() {
        let headers = {
            'Content-Type': 'application/json'
        }
        if (this.is_authenticated()) {
            headers['Authorization'] = 'Token ' + this.state.token
        }
        return headers
    }

    load_data() {
        const headers = this.get_headers()
        axios.get('http://127.0.0.1:8000/api/users', {headers})
            .then(response => {
                this.setState(
                    {
                        'users': response.data.results
                    })
            }).catch(error => console.log(error))

        axios.get('http://127.0.0.1:8000/api/project', {headers})
            .then(response => {
                this.setState(
                    {
                        'projects': response.data.results
                    })
            }).catch(error => console.log(error))

        axios.get('http://127.0.0.1:8000/api/todo', {headers})
            .then(response => {
                this.setState(
                    {
                        'todoes': response.data.results
                    })
            }).catch(error => {
                    console.log(error)
                    this.setState({'todoes': []})
                })
    }

    createProject(name, link_to_git, owners) {
        const headers = this.get_headers()
        const data = {name: name, link_to_git: link_to_git,  owners: [owners]}
        axios.post(`http://127.0.0.1:8000/api/project/`, data, {headers: headers})
            .then(response => {
                let new_project = response.data
                const owners = this.state.owners.filter((item) => item.id === new_project.owners)[0]
                new_project.owners = owners
                this.setState({projects: [...this.state.projects, new_project]})
            }).catch(error => console.log(error))
    }


    deleteProject(id) {
        const headers = this.get_headers()
        axios.delete(`http://127.0.0.1:8000/api/project/${id}`, {headers: headers})
            .then(response => {
                this.setState({projects: this.state.projects.filter((item)=>item.id !== id)})
            }).catch(error => console.log(error))
    }

    createTodo(text, project, creator) {
        const headers = this.get_headers()
        const data = {text: text, project: project,  creator: creator}
        console.log(data)
        axios.post(`http://127.0.0.1:8000/api/todo/`, data, {headers: headers})
            .then(response => {
                let new_todo = response.data
                const creator = this.state.creator.filter((item) => item.id === new_todo.owners)[0]
                new_todo.creator = creator
                this.setState({todoes: [...this.state.todoes, new_todo]})
            }).catch(error => console.log(error))
    }

    deleteTodo(id) {
        const headers = this.get_headers()
        axios.delete(`http://127.0.0.1:8000/api/todo/${id}`, {headers: headers})
            .then(response => {
                this.setState({todoes: this.state.todoes.filter((item)=>item.id !== id)})
            }).catch(error => console.log(error))
    }

    componentDidMount() {
        this.get_token_from_storage()
    }

    render () {
        return (
            <div>
                <MenuItem/>
                <div className="App">
                    <BrowserRouter>
                        <nav>
                            <ul>
                                <li>
                                    <Link to='/users'>Users</Link>
                                </li>
                                <li>
                                    <Link to='/projects'>Projects</Link>
                                </li>
                                <li>
                                    <Link to='/todoes'>Todoes</Link>
                                </li>
                                <li>
                                    {this.is_authenticated() ? <button onClick={()=>this.logout()}>Logout</button> :
                                    <Link to='/login'>Login</Link>}
                                </li>
                            </ul>
                        </nav>
                        <Routes>
                            <Route path='/users' element={<UserList users={this.state.users} />}/>
                            <Route path='/projects' element={<ProjectList
                                projects={this.state.projects} deleteProject={(id) => this.deleteProject(id)}/>}/>
                            <Route path='/todoes' element={<TodoList todoes={this.state.todoes}
                                deleteTodo={(id) => this.deleteTodo(id)}/>}/>
                            <Route path='/login' element={<LoginForm
                                get_token={(username, password) => this.get_token(username, password)}/>}/>
                            <Route exact path='/projects/create' element={<ProjectForm
                                users={this.state.users}
                                createProject={(name, link_to_git, owners) => this.createProject(name, link_to_git, owners)}
                            />}/>
                            <Route exact path='/todoes/create' element={<TodoForm
                                users={this.state.users} projects={this.state.projects}
                                createTodo={(name, link_to_git, owners) => this.createTodo(name, link_to_git, owners)}
                            />}/>
                        </Routes>
                    </BrowserRouter>
                </div>
                <FooterItem/>
            </div>
        )
    }
}


export default App;
