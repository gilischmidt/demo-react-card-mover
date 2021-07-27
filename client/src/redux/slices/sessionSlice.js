import {createSlice} from '@reduxjs/toolkit'

const initialState = {
    currentUser: null,
    currentBoard: null,
    showBackdrop: false,
    toast: {open:false},
};

export const sessionSlice = createSlice({
    name: 'session',
    initialState,
    reducers: {
        setCurrentUser(state, user) {
            if (user.payload) {
                const name = user.payload;

                state.currentUser = {
                    name: name,
                    id: `${name}${Math.floor(Math.random() * 1000000)}`
                };
            } else {
                state.currentUser = null;
            }
        },

        setCurrentBoard(state, board) {
            if (board.payload) {
                const name = board.payload;
                state.currentBoard = {
                    name: name,
                    id: encodeURIComponent(name)
                };
            } else {
                state.currentBoard = null;
            }
        },

        setShowBackdrop(state, show) {
            state.showBackdrop = show.payload;
        },

        setToast(state, params) {
            state.toast = params.payload;
        }

    }
})

export const {setCurrentUser, setCurrentBoard, setShowBackdrop, setToast} = sessionSlice.actions;
export default sessionSlice.reducer;