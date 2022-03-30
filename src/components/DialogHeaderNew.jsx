import React from 'react';
import { useTheme } from '@mui/styles';
import { AppBar, Toolbar, IconButton, Typography } from '@mui/material';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';

function DialogHeaderNew({ header, handleClose }) {
    const theme = useTheme();

    return (
        <AppBar sx={{ position: 'fixed', color: theme.palette.common.white, background: theme.palette.background.darkGrey }} elevation={0}>
            <Toolbar>
                <IconButton
                    edge="end"
                    color="inherit"
                    onClick={handleClose}
                    aria-label="close"
                >
                    <ArrowBackIosIcon fontSize='large' />
                </IconButton>
                <Typography sx={{ mr: 2, flex: 1, fontWeight: 600, textAlign: 'center' }} variant="h2">
                    {header}
                </Typography>
            </Toolbar>
        </AppBar>
    );
}

export default DialogHeaderNew;
