import {createSlice} from '@reduxjs/toolkit'

const initialState = {
    position: null,
    isBeingDragged: false,
};

export const cardSlice = createSlice({
    name: 'cards',
    initialState,
    reducers: {
        move(state, position) {
            state.position = position.payload;
        },

        toggleDrag(state, isBeingDragged) {
            state.isBeingDragged = isBeingDragged.payload;
        },
    }
})

export const {move, dragStart, dragStop} = cardSlice.actions;
export default cardSlice.reducer;