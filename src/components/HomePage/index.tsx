import * as React from 'react';
import { RouteComponentProps, withRouter } from 'react-router';

export interface IHomePageProps extends RouteComponentProps {
    token: string | null;
}

export class HomePage extends React.Component<IHomePageProps> {

    public componentDidMount() {
        if (!this.props.token) {
            this.props.history.push('/login')
        }
    }

    public goToGameList = () => {
        this.props.history.push('/games')
    }
    
    public render() {

        return <div>Home Page!
            <button onClick = { this.goToGameList }>Go to Game List</button>
        </div>
    }
} 

export default withRouter(HomePage);