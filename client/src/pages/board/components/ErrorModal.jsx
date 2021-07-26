import React from "react";
import {Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle} from "@material-ui/core";

function ErrorModal({open, onReconnect, onDisconnect}) {
    return (
        <Dialog open={open} onClose={onReconnect}>
            <DialogTitle>Something went wrong</DialogTitle>
            <DialogContent>
                <DialogContentText style={{color: 'black'}}>
                    Lost connection to the server. Please refresh the page and try again.
                </DialogContentText>
            </DialogContent>

            <DialogActions>
                <Button onClick={onReconnect} color="primary" variant={"contained"} autoFocus>
                    Refresh page
                </Button>
                <Button onClick={onDisconnect} color="primary" variant={"outlined"} autoFocus>
                    Disconnect
                </Button>
            </DialogActions>
        </Dialog>
    )
}

export default ErrorModal;