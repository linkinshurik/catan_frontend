import axios from 'axios';
import * as React from 'react';
import { IGame } from 'src/types';

export interface IGameListState {
    gameList: IGame[];
}

export default class GameList extends React.Component <any, IGameListState>{

    constructor(props: any){
        super(props);

        this.state = {
            gameList: []
        }
    }

    public componentWillMount() {
        axios.get('/api/games').then(res => {
            this.setState({
                gameList: res.data
            })
        })
    }

    public render() {
        const { gameList } = this.state;
        const list = gameList.map((item: IGame) => <div key={item.id}>{item.id} {item.active ? 'Active' : 'Outdated'}</div>)
        
        return <div>{list}</div>
    }
}