import axios from 'axios';
import * as React from 'react';
import { withRouter } from 'react-router';
import { IGame } from 'src/types';
import { GameItem } from './GameItem';

export interface IGameListState {
    gameId: string | null;
    gameList: IGame[];
}

export class GameList extends React.Component <any, IGameListState>{

    constructor(props: any){
        super(props);

        this.state = {
            gameId: null,
            gameList: [],
        }

        this.createGame = this.createGame.bind(this);
        this.updateList = this.updateList.bind(this);
        this.joinGame = this.joinGame.bind(this);
    }

    public componentWillMount() {
        this.updateList();
    }

    public updateList() {
        axios.get('/api/games').then(res => {
            this.setState({
                gameList: res.data
            })
        })
    }

    public createGame() {
        axios.post('/api/games', { Token: this.props.Token }).then(res => {
            this.setState({
                gameId: res.data
            })
        })
    }

    public joinGame(id: string) {
        this.props.history.push("/join/" + id);
    }

    public render() {
        const { gameList } = this.state;
        const list = gameList.map((item: IGame) => <GameItem 
            key = { item.id } 
            onClickHandler = { this.joinGame } 
            game = { item } 
        />)
        
        return <div>
                <button onClick = { this.updateList }>Update</button>
                { list }
                <button onClick = { this.createGame }>CreateGame!</button>
            </div>
    }
}

export default withRouter(GameList);
