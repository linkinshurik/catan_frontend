import * as React from 'react';
import './App.css';
import GameList from './components/GameList';
import Login from './components/Login';
import { IUser } from './types';

class App extends React.Component {
  constructor(props: any) {
    super(props) 
    this.state = {
      user: {
        name: localStorage.getItem('name'),
        token: localStorage.getItem('token')
      }
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
    return (
      <div className="App">
       
        <Login setUserToken = {this.setUserToken}/>
        <GameList />
      </div>
    );
  }
}

export default App;
