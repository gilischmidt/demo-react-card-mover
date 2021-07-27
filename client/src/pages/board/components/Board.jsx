import React from "react";
import {HTML5Backend} from "react-dnd-html5-backend";
import {DndProvider} from "react-dnd";

import Column from "./Column";
import Card from "./Card";
import {useSelector} from "react-redux";
import BoardWebsocket, {boardWebsocketActions} from "../websockets/boardWebsocket";


function Board(props) {
    const position = useSelector((state) => state.card.position);

    const moveCardToColumn = ({targetColumnId}) => {
        BoardWebsocket.emit(boardWebsocketActions.CARD_MOVED, targetColumnId);
    }

    return (
        <div style={{display: 'flex'}}>
            <DndProvider backend={HTML5Backend}>
                <Column id={'left'} background={'#E6E6FA'}>
                    {position === 'left' ? <Card id={'my-card'} onDropCard={moveCardToColumn}/> : null}
                </Column>

                <Column id={'right'} background={'#fae6e6'}>
                    {position === 'right' ? <Card id={'my-card'} onDropCard={moveCardToColumn}/> : null}
                </Column>
            </DndProvider>
        </div>
    )
}

export default Board;