import React from 'react';
import axios from "axios";
import './logo.svg';
import './App.css';
import UserList from './components/User.js'


class App extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      'users': []
    }

  }

  componentDidMount() {
    axios.get('http://127.0.0.1:8000/api/users')
      .then(response => {
        const users = response.data
          this.setState(
          {
            'users': users
          }
        )
      }).catch(error => console.log(error))
  }

  render () {
    return (
      <div>
        <div className="top">
            MENU
        </div>
        <UserList users={this.state.users} />
        <div className="footer">
            FOOTER
        </div>
      </div>
    )
  }
}


export default App;
