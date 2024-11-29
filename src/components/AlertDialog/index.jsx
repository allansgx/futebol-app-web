import React, { useState } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { Box } from '@mui/material';

export default function AlertDialog ({ children, title, description, content, onConfirm, ...other }) {
    const [open, setOpen] = useState(false)

    const handleClickOpen = () => {
        setOpen(true)
    };

    const handleClose = () => {
        setOpen(false)
    };

    const handleConfirm = () => {
        onConfirm()
        setOpen(false)
    }

    return (
        <>
            <Box onClick={handleClickOpen}>
                { children }
            </Box>

            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
                {...other}
            >
                <DialogTitle id="alert-dialog-title">
                    { title ??  '' }
                </DialogTitle>

                <DialogContent sx={{ overflowY: 'unset' }}>
                    <DialogContentText id="alert-dialog-description">
                        { description ?? ''}
                    </DialogContentText>

                    { content ?? '' }
                </DialogContent>

                <DialogActions>
                    <Button onClick={handleClose}>
                        Cancelar
                    </Button>

                    <Button onClick={handleConfirm} autoFocus>
                        Confirmar
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
}
