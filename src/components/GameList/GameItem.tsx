import * as React from 'react';
import { IGame } from 'src/types';

export interface IGameItem {
    game: IGame;
    onClickHandler: (id: string) => void;
}

export const GameItem = (props: IGameItem) => {
    const { onClickHandler, game } = props;
    const onClick = () => {
        onClickHandler(game.id);
    }

    return <div>
                {game.id} {game.active ? 'Active' : 'Outdated'}
                <a onClick={ onClick }>Join</a>
            </div>
}