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
        return this.state.token != ''
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
                            <Route path='/projects' element={<ProjectList projects={this.state.projects} />}/>
                            <Route path='/todoes' element={<TodoList todoes={this.state.todoes} />}/>
                            <Route path='/login' element={<LoginForm
                                get_token={(username, password) => this.get_token(username, password)}/>}/>
                        </Routes>
                    </BrowserRouter>
                </div>
                <FooterItem/>
            </div>
        )
    }
}


export default App;
