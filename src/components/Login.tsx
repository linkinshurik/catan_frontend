import axios from 'axios';
import * as React from 'react';

export interface ILoginProps {
    title: string;
};
export interface ILoginState {
    name: string;
    token: string | null;
};

export default class Login extends React.Component<ILoginProps, ILoginState> {
    constructor(props: any) {
        super(props);
        this.state = {
            name: '',
            token: localStorage.getItem('token'),
        }

        this.onNameChange = this.onNameChange.bind(this);
        this.onSaveName = this.onSaveName.bind(this);
    }

    public onNameChange(e: any) {
        this.setState({name: e.target.value})
    }

    public onSaveName() {
        axios.get("https://localhost:44326/api/games")
    }

    public render() {
        const { name } = this.state;

        return <div>
            <input value = {name} onChange = { this.onNameChange }/>
            <button onClick = { this.onSaveName } >Submit</button>
        </div>
    }
}