import React from 'react';
import axios from "axios";
import {BrowserRouter, Link, Route, Routes} from "react-router-dom";
import './logo.svg';
import './App.css';
import UserList from './components/Users.js'
import ProjectList from './components/Projects.js'
import TodoList from './components/Todoes.js'
import MenuItem from "./components/Menu";
import FooterItem from "./components/Footer";


class App extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            'users': [],
            'projects': [],
            'todoes': [],
        }
    }

    componentDidMount() {
        axios.get('http://127.0.0.1:8000/api/users')
            .then(response => {
                const users = response.data.results
                this.setState(
                    {
                        'users': users
                    })
            }).catch(error => console.log(error))

        axios.get('http://127.0.0.1:8000/api/project')
            .then(response => {
                const projects = response.data.results
                this.setState(
                    {
                        'projects': projects
                    })
            }).catch(error => console.log(error))

        axios.get('http://127.0.0.1:8000/api/todo')
            .then(response => {
                const todoes = response.data.results
                this.setState(
                    {
                        'todoes': todoes
                    })
            }).catch(error => console.log(error))
    }

    render () {
        console.log('hello')
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
                            </ul>
                        </nav>
                        <Routes>
                            <Route path='/users' element={<UserList users={this.state.users} />}/>
                            <Route path='/projects/*' element={<ProjectList projects={this.state.projects} />}/>
                            <Route path='/todoes' element={<TodoList todoes={this.state.todoes} />}/>
                        </Routes>
                    </BrowserRouter>
                </div>
                <FooterItem/>
            </div>
        )
    }
}


export default App;
