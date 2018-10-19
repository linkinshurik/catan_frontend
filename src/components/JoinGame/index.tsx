import axios from 'axios';
import * as React from 'react';
import App from 'src/App';


export default class JoinGame extends React.Component<any, any> {
    constructor(props: any) {
        super(props);

        this.state = {
            game: null
        }
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
        </div>
    }
}