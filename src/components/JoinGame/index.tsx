import * as React from 'react';

export default class JoinGame extends React.Component<any> {
    constructor(props: any) {
        super(props);

        this.state = {
            
        }
    }
    public render() {

        return <div>
            Join to game {this.props.match.params.id}
        </div>
    }
}