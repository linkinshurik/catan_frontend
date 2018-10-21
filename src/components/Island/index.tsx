import axios from 'axios';
import * as React from 'react';
import App from 'src/App';
import { IIsland, IUser } from 'src/types';

export interface IIslandState {
    land: IIsland | any;
    user: IUser | null;
}

export default class Island extends React.Component<any, IIslandState> {
    constructor(props: any) {
        super(props);

        this.state = {
            land: null,
            user: App.getUserFromLS()
        }
    }

    public componentDidMount() {
        axios.get('/api/land/' + this.props.match.params.id).then((res) => this.setState({
            land: res.data
        }))
    }
    public render() {

        return <div> Island game starting... </div>
    }
}