import createBrowserHistory from 'history/createBrowserHistory'
import * as React from 'react';
import { Route, Router } from 'react-router'

import GameList from './components/GameList';
import HomePage from './components/HomePage';
import Island from './components/Island';
import JoinGame from './components/JoinGame';
import Login from './components/Login';
import { IUser } from './types';

export interface IAppState {
  history: any;
  user: IUser | null;
}

class App extends React.Component <any, IAppState>{
  public static getUserFromLS() {
    const name = localStorage.getItem('name');
    const token = localStorage.getItem('token');

    if (name && token) {
      return { name, token }
    }

    return null;
  }

  constructor(props: any) {
    super(props);

    this.state = {
      history: createBrowserHistory(),
      user: App.getUserFromLS()
    }

    this.setUserToken = this.setUserToken.bind(this);
  }

  public setUserToken(user: IUser) {
    localStorage.setItem('token', user.token);
    localStorage.setItem('name', user.name);

    this.setState({user});
  }

  public logOut() {
    localStorage.removeItem('token');
    localStorage.removeItem('name');

    this.setState({user: null});
  }

  public render() {
    const { user } = this.state;
    const LoginForm = () => <Login setUserToken = {this.setUserToken} token = {user && user.token}/>
    const HomePageForm = () => <HomePage token = {user && user.token}/>

    return (
      <Router history={this.state.history}>
        <div className="App">
          <Route exact = { true } path={"/"} component={HomePageForm} />
          <Route path={"/login"} component={LoginForm} />
          <Route path={"/join/:id"} component={JoinGame} />
          <Route path={"/games"} component={GameList} />
          <Route path={"/land/:id"} component={Island} />
        </div>
      </Router>

    );
  }
}

export default App;
