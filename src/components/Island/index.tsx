import axios from 'axios'
import * as React from 'react'
import { Layer, RegularPolygon, Stage } from 'react-konva'

import App from 'src/App'
import { IGeks, IUser } from 'src/types'

import brick from '../../assets/map/brick.png'
import desert from '../../assets/map/desert.png'
import lumber from '../../assets/map/lumber.png'
import ore from '../../assets/map/ore.png'
import sheep from '../../assets/map/sheep.png'
import wheat from '../../assets/map/wheat.png'

export interface IIslandState {
    land: IGeks[];
    user: IUser | null;
}

export default class Island extends React.Component<any, IIslandState> {
    state: {
        land: [],
        user: any,
        assetsImgObj: HTMLImageElement[]
    } = {
        land: [],
        user: App.getUserFromLS(),
        assetsImgObj: []
    }

    public componentDidMount() {
        const { id } = this.props.match.params
        const assets = [lumber, sheep, wheat, brick, ore, desert]

        const assetsPreload = assets.map((item) => {
            return new Promise(res => {
                const imageObj = new Image()

                imageObj.onload = () => res(imageObj)
                imageObj.src = item
            })
        })

        axios.get(`/api/land/${id}`).then(({ data: land }) => this.setState({ land }))
        Promise.all(assetsPreload).then((assetsImgObj: HTMLImageElement[]) => {
            // @ts-ignore
            this.setState(() => ({ assetsImgObj }))
        })
    }

    public render() {
        const { land, assetsImgObj } = this.state;
        const { innerWidth: width } = window;
        let geksPosition = 0;

        const rowList = [
            [1, 1, 1],
            [1, 1, 1, 1],
            [1, 1, 1, 1, 1],
            [1, 1, 1, 1],
            [1, 1, 1],
        ]

        const size = 100
        const getPad = (countHexa: number) => (width - countHexa * 1.73 * size) / 2
        const gridPadding = [
            getPad(3),
            getPad(4),
            getPad(5),
            getPad(4),
            getPad(3),
        ]

        // function getRandomInt(min: number, max: number) {
        //     return Math.floor(Math.random() * (max - min + 1)) + min;
        // }

        if (!assetsImgObj.length || !land.length) {
            return null
        }

        return (
            <Stage width={window.innerWidth} height={window.innerHeight}>
                <Layer>
                    {rowList.map((row: any, iRow: number) => {
                        const getImg = (geks: IGeks) => this.state.assetsImgObj[geks.identifier];

                        return row.map((grid: any, i: number) => (
                            <RegularPolygon
                                key={`${iRow}_${i}`}
                                x={80 + gridPadding[iRow] + size * 1.73 * i}
                                y={105 + size * 1.5 * iRow}
                                sides={6}
                                radius={size}
                                fillPatternScaleX={.19}
                                fillPatternScaleY={.19}
                                fillPatternOffset={{ x: 460, y: 550 }}
                                fillPatternImage={getImg(land[geksPosition++])}
                            />
                        ))
                    })}
                </Layer>
            </Stage>
        )
    }
}

