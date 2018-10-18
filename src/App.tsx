import * as React from 'react';
import './App.css';
import GameList from './components/GameList';
import Login from './components/Login';
import { IUser } from './types';

import createBrowserHistory from 'history/createBrowserHistory'
import { Route, Router } from 'react-router'
import JoinGame from './components/JoinGame';

class App extends React.Component <any, any>{
  constructor(props: any) {
    super(props) 
    this.state = {
      history: createBrowserHistory(),
      user: {
        name: localStorage.getItem('name'),
        token: localStorage.getItem('token')
      },
    }
    
    this.setUserToken = this.setUserToken.bind(this);
  }

  public setUserToken(user: IUser) {
    localStorage.setItem('token', user.token);
    localStorage.setItem('name', user.name);

    this.setState({user})
  }

  public logOut() {
    localStorage.removeItem('token');
    localStorage.removeItem('name');

    this.setState({user: null});
  }

  public render() {
    const LoginForm = () => <Login setUserToken = {this.setUserToken}/>
    return (
      <Router history={this.state.history}>
        <div className="App">
          <Route exact = { true } path={"/"} component={LoginForm} />
          <Route path={"/login"} component={LoginForm} />
          <Route path={"/join/:id"} component={JoinGame} />
          <Route path={"/games"} component={GameList} />
        </div>
      </Router>

    );
  }
}

export default App;
