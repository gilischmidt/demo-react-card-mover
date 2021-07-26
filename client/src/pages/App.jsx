import React from "react";
import {useSelector} from "react-redux";
import {Backdrop, CircularProgress, Snackbar} from '@material-ui/core';
import {renderRoutes} from "./../routes/index";

import {BrowserRouter} from 'react-router-dom';
import MuiAlert from "@material-ui/lab/Alert";
import {store} from "../redux/store";
import {sessionSlice} from "../redux/slices/sessionSlice";

function App() {
    const showBackdrop = useSelector((state) => state.session.showBackdrop);
    const alertData = useSelector(state => state.session.toast);

    function hideAlert() {
        store.dispatch(sessionSlice.actions.setToast({
            open: false
        }));
    }

    return (
        <>
            <Backdrop open={showBackdrop} style={{zIndex: 9999999}}>
                <CircularProgress color="inherit"/>
            </Backdrop>

            <Snackbar open={alertData.open} autoHideDuration={3000} onClose={hideAlert}
                      anchorOrigin={{vertical: 'top', horizontal: 'center'}}>
                <MuiAlert elevation={6} variant="filled" severity={alertData.type} onClose={hideAlert}>
                    {alertData.message}
                </MuiAlert>
            </Snackbar>

            <BrowserRouter>
                {renderRoutes()}
            </BrowserRouter>
        </>
    )
}

export default App;
