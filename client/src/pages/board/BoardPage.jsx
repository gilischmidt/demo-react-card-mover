import React, {useEffect, useState} from "react";

import UserList from "./components/UserList";
import Board from "./components/Board";
import BoardWebsocket, {boardWebsocketActions} from "./websockets/boardWebsocket";
import {store} from "../../redux/store";
import {sessionSlice} from "../../redux/slices/sessionSlice";
import {useHistory, useParams} from "react-router-dom";
import ErrorModal from "./components/ErrorModal";
import {userSlice} from "../../redux/slices/userSlice";
import {cardSlice} from "../../redux/slices/cardSlice";
import {Button} from "@material-ui/core";

import ExitToAppIcon from '@material-ui/icons/ExitToApp';

function BoardPage() {
    let {id} = useParams();
    const history = useHistory();
    const [showErrorModal, setShowErrorModal] = useState(false);

    const handleSocketError = async (error) => {
        switch (error) {
            case 'reconnect':
                await getInitialData();
                store.dispatch(sessionSlice.actions.setShowBackdrop(false));
                break;
            case 'reconnecting':
                store.dispatch(sessionSlice.actions.setShowBackdrop(true));
                break;
            case 'connect_failed':
            case 'reconnect_failed':
                BoardWebsocket.disconnect();
                store.dispatch(sessionSlice.actions.setShowBackdrop(false));
                setShowErrorModal(true);
                break;
        }
    }

    const disconnect = () => {
        store.dispatch(sessionSlice.actions.setCurrentUser(null));
        history.push('/join/' + id);
    }

    const refreshPage = () => {
        history.go(0);
    }

    const copyUrl = () => {
        navigator.clipboard.writeText(window.location.href);

        store.dispatch(sessionSlice.actions.setToast({
            open: true,
            message: 'Link copied to clipboard!',
            type: 'success',
        }));
    }

    const getInitialData = () => {
        return fetch('/api/board-status/' + id)
            .then(resp => resp.json())
            .then(resp => {
                if (resp.error === false) {
                    store.dispatch(userSlice.actions.sync(resp.data.users));
                    store.dispatch(cardSlice.actions.move(resp.data.cardPosition));
                    return false;
                } else {
                    return true;
                }
            })
            .catch(reason => {
                BoardWebsocket.disconnect();
                store.dispatch(sessionSlice.actions.setShowBackdrop(false));
                setShowErrorModal(true);

                return true;
            });
    }

    useEffect(async () => {
        const board = store.getState().session.currentBoard;
        const user = store.getState().session.currentUser;

        if (user === null || board === null) {
            history.push('/join/' + id);
            return;
        }

        store.dispatch(sessionSlice.actions.setShowBackdrop(true));

        await BoardWebsocket.connect(board, handleSocketError);
        BoardWebsocket.emit(boardWebsocketActions.USER_CONNECTED, {
            user: user,
            board: board.name
        });

        await getInitialData();
        store.dispatch(sessionSlice.actions.setShowBackdrop(false));

    }, []);

    history.listen(location => {
        BoardWebsocket.disconnect();
    })

    return (
        <>
            <ErrorModal open={showErrorModal} onReconnect={refreshPage} onDisconnect={disconnect}/>

            <div style={{
                display: 'flex',
                height: '100%',
                flexDirection: 'column',
            }}>
                <div style={{
                    width: '100%',
                    padding: 10,
                    background: '#20232a',
                    color: 'white',
                    fontSize: '1.5rem'
                }}>
                    Card Mover <Button style={{fontSize: '0.8rem', color: '#bdbdbd', marginRight: 5}} onClick={copyUrl}>
                    (Click here to copy invite link)
                </Button>

                    <Button color={'primary'} variant={'contained'} style={{float: 'right', marginRight: 25}}
                            onClick={disconnect}>
                        <ExitToAppIcon/>
                    </Button>
                </div>

                <div style={{
                    flex: 'auto',
                    display: "flex",
                }}>

                    <div style={{
                        width: 300,
                        height: '100%',
                        overflow: 'auto',
                    }}>
                        <UserList/>
                    </div>

                    <div style={{
                        flex: 'auto'
                    }}>
                        <Board/>
                    </div>
                </div>
            </div>
        </>
    );
}

export default BoardPage;