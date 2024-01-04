import React from "react";
import { Dialog, Alert, AlertTitle } from "@mui/material";

type Props = {
    open: boolean;
    handleClose: () => void;
};

const NoUsernameAlertDialog: React.FC<Props> = ({ open, handleClose }) => {
    return (
        <Dialog open={open} aria-labelledby="No-username" aria-describedby="Provide-username">
            <Alert severity="error" onClose={handleClose}>
                <AlertTitle>No username provided</AlertTitle>
                Unable to submit request as <strong>no username is provided</strong>
            </Alert>
        </Dialog>
    );
};

export default NoUsernameAlertDialog;
