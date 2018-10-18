import axios from 'axios';
import * as React from 'react';
import { IUser } from 'src/types';

export interface ILoginProps {
    setUserToken: (user: IUser) => void;
};
export interface ILoginState {
    name: string;
};

export default class Login extends React.Component<ILoginProps, ILoginState> {
    constructor(props: any) {
        super(props);
        this.state = {
            name: ''
        }

        this.onNameChange = this.onNameChange.bind(this);
        this.onSaveName = this.onSaveName.bind(this);
    }

    public onNameChange(e: any) {
        this.setState({name: e.target.value})
    }

    public onSaveName() {
        const { name } = this.state;
        axios.post("/api/users/register", {Name: name})
            .then((res) => this.props.setUserToken(res.data))
    }

    public render() {
        const { name } = this.state;

        return <div>
            <input value = {name} onChange = { this.onNameChange }/>
            <button onClick = { this.onSaveName } >Submit</button>
        </div>
    }
}