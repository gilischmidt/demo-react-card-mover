import {createSlice} from '@reduxjs/toolkit'

const initialState = {
    connectedUsers: [],
};

export const userSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {
        add(state, user) {
            if (state.connectedUsers.find(u => u.id === user.payload.id) === undefined) {
                state.connectedUsers.push(user.payload);
            }
        },
        remove(state, user) {
            state.connectedUsers = state.connectedUsers.filter(u => u.id !== user.payload.id);
        },

        toggleDrag(state, user) {
            const aux = state.connectedUsers.find(u => u.id === user.payload.id);

            if (aux) {
                aux.isMovingCard = user.payload.isDragging;
            }
        },
        sync(state, activeUsers) {
            state.connectedUsers = activeUsers.payload;
        },
    }
})

export const {add, remove, toggleDrag, sync} = userSlice.actions;
export default userSlice.reducer;