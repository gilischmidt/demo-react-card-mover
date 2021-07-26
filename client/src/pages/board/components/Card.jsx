import React from "react";
import {useDrag} from "react-dnd";
import {useSelector} from "react-redux";
import BoardWebsocket, {boardWebsocketActions} from "../websockets/boardWebsocket";
import {store} from "../../../redux/store";
import {cardSlice} from "../../../redux/slices/cardSlice";

function Card({id, onDropCard}) {
    const [{isDragging}, dragRef] = useDrag({
        type: 'card',
        item: {id: id},
        end: (draggedItem, monitor) => {
            const dropResult = monitor.getDropResult();

            if (draggedItem && dropResult) {
                onDropCard({
                    ...dropResult,
                    card: draggedItem
                });
            }
        },

        collect: monitor => ({
            isDragging: !!monitor.isDragging()
        })
    });

    const dragStatus = useSelector((state) => state.card.isBeingDragged);

    if (dragStatus !== isDragging) {
        if (isDragging) {
            BoardWebsocket.emit(boardWebsocketActions.DRAG_STARTED);
        } else {
            BoardWebsocket.emit(boardWebsocketActions.DRAG_STOPPED);
        }

        store.dispatch(cardSlice.actions.toggleDrag(isDragging));
    }

    return (
        <div className={'Card'} style={{
            padding: 15,
            background: 'white',
            border: '1px solid gray',
            borderRadius: 5,
            textAlign: 'center',
            cursor: 'move',
            boxShadow: 'rgba(0, 0, 0, 0.35) 0px 5px 15px'
        }} ref={dragRef}>
            <h2 className={'TextRainbow'}>Click & hold to move</h2>
        </div>
    )
}

export default Card;

