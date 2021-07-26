import React from "react";
import BoardIndexLayout from "./layout/BoardIndexLayout";
import {Button, TextField, Typography} from "@material-ui/core";
import {store} from "../../redux/store";
import {sessionSlice} from "../../redux/slices/sessionSlice";
import {useHistory} from "react-router-dom";

function CreateBoardPage(props) {
    const history = useHistory();

    const handleFormSubmit = (ev) => {
        ev.preventDefault();
        store.dispatch(sessionSlice.actions.setCurrentUser(ev.target.name.value));
        store.dispatch(sessionSlice.actions.setCurrentBoard(ev.target.board.value));
        history.push('/board/' + store.getState().session.currentBoard.id);
    }

    return (
        <BoardIndexLayout>

            <Typography component="p">
                Create a new board
            </Typography>

            <form onSubmit={handleFormSubmit}>
                <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    id="board"
                    label="Board name"
                    name="board"
                    autoFocus
                />

                <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    id="name"
                    label="What's your name?"
                    name="name"/>


                <Button type="submit" fullWidth variant="contained" color="primary">
                    Create
                </Button>
            </form>
        </BoardIndexLayout>
    )
}

export default CreateBoardPage;