import React, {useEffect} from "react";
import {store} from "../../redux/store";
import {sessionSlice} from "../../redux/slices/sessionSlice";
import {Link, useHistory, useParams} from "react-router-dom";
import BoardIndexLayout from "./layout/BoardIndexLayout";
import {Button, TextField, Typography} from "@material-ui/core";

const JoinBoardPage = (props) => {
    const history = useHistory();
    let {id} = useParams();

    const handleFormSubmit = (ev) =>{
        ev.preventDefault();

        store.dispatch(sessionSlice.actions.setCurrentUser(ev.target.name.value));
        store.dispatch(sessionSlice.actions.setCurrentBoard(decodeURIComponent(id)));

        history.push('/board/' + id);
    }

    useEffect(() => {
        if (store.getState().session.currentUser) {
            store.dispatch(sessionSlice.actions.setCurrentBoard(decodeURIComponent(id)));
            history.push('/board/' + id);
        }
    });

    return (
        <BoardIndexLayout>

            <Typography component="p">
                You are about to join the board: <b>{id}</b>
            </Typography>

            <form onSubmit={handleFormSubmit}>
                <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    id="name"
                    label="What's your name?"
                    name="name"/>


                <Button type="submit" fullWidth variant="contained" color="primary">
                    Join
                </Button>
            </form>

            <Link style={{fontSize: '0.8rem', marginTop: 10}}
                  to="/">Create another board</Link>
        </BoardIndexLayout>
    )
}

export default JoinBoardPage;