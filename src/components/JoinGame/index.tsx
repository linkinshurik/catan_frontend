import axios from 'axios';
import * as React from 'react';
import { withRouter } from 'react-router';
import App from 'src/App';


export class JoinGame extends React.Component<any, any> {
    constructor(props: any) {
        super(props);

        this.state = {
            game: null
        }

        this.onStartGame = this.onStartGame.bind(this);
    }

    public componentDidMount() {
        const user = App.getUserFromLS();

        axios.post('/api/games/join', {
            GameId: this.props.match.params.id,
            UserId: user && user.token
        }).then((res) => this.setState({
            game: res.data
        }))
    };

    public onStartGame() {
        this.props.history.push('/land/' + this.state.game.landId);
    }

    public render() {
        const { game } = this.state;
        if ( game === null ) {
            return <div>Loading...</div>
        }
        
        return <div>
            Join to the game {this.props.match.params.id}
            <div>{game.user1}</div>
            <div>{game.user2}</div>
            <div>{game.user3}</div>
            <div>{game.user4}</div>
            <button onClick = { this.onStartGame }>Start game</button>
        </div>
    }
}

export default withRouter(JoinGame);