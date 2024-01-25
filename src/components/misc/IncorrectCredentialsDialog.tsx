import React from "react";
import { Dialog, Alert, AlertTitle } from "@mui/material";

type Props = {
    open: boolean;
    handleClose: () => void;
};

const IncorrectCredentialsDialog: React.FC<Props> = ({ open, handleClose }) => {
    return (
        <Dialog open={open} aria-labelledby="Incorrect Credentials" aria-describedby="Re enter password/username">
            <Alert severity="error" onClose={handleClose}>
                <AlertTitle>Username/Password is incorrect!</AlertTitle>
                Please try again
            </Alert>
        </Dialog>
    );
};

export default IncorrectCredentialsDialog;
