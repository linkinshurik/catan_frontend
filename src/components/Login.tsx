import axios from 'axios';
import * as React from 'react';
import { RouteComponentProps, withRouter } from 'react-router';
import { IUser } from 'src/types';

export interface ILoginProps extends RouteComponentProps {
    token: string;
    
    setUserToken: (user: IUser) => void;
};
export interface ILoginState {
    name: string;
};

export class Login extends React.Component<ILoginProps, ILoginState> {
    constructor(props: any) {
        super(props);
        this.state = {
            name: ''
        }

        this.onNameChange = this.onNameChange.bind(this);
        this.onSaveName = this.onSaveName.bind(this);
    }

    public componentDidMount() {
        if (this.props.token) {
            this.props.history.push('/games')
        }
    }

    public onNameChange(e: any) {
        this.setState({name: e.target.value})
    }

    public onSaveName() {
        const { name } = this.state;
        axios.post("/api/users/register", {Name: name})
            .then((res) => { 
                this.props.setUserToken(res.data);
                this.props.history.push('/games');
            })
    }

    public render() {
        const { name } = this.state;

        return <div>
            <input value = {name} onChange = { this.onNameChange }/>
            <button onClick = { this.onSaveName } >Submit</button>
        </div>
    }
}

export default withRouter(Login);