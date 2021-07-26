import React from "react";
import {useDrop} from "react-dnd";


function Column({id, background, children}) {
    const [{isOver}, addToColumn] = useDrop({
        accept: 'card',
        drop: (item, monitor) => {
            return {
                targetColumnId: id,
            }
        },
        collect: (monitor) => ({
            isOver: !!monitor.isOver(),
        }),
    });

    return (
        <div style={{
            overflow: 'auto',
            margin: 5,
            padding: 10,
            height: 'calc(100vh - 85px)',
            width: '50%',
            border: isOver ? '3px dashed black' : '1px dashed gray',
            background: background,
            borderRadius: 4,
        }} ref={addToColumn}>
            {children}
        </div>
    )
}

export default Column;

