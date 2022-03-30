import React, { useEffect, useState } from 'react';
import { makeStyles, useTheme } from '@mui/styles';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Button, Dialog, ListItemText, ListItem, List, Divider, AppBar, Toolbar, IconButton, Typography } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { categoryOptionsMap } from '../resources/constants.jsx';
import SearchListOldVer from '../components/SearchListOldVer';

const useStyles = makeStyles(theme => ({

}));

function CategoryOptionsDialog({ category, doSearch, open, fullScreen=false, handleClose }) {
    const classes = useStyles();
    const theme = useTheme();
    const location = useLocation();
    const navigate = useNavigate();

    const renderDialogHeader = () => {
        return (
            <AppBar sx={{ position: 'fixed', color: theme.palette.text.primary, background: theme.palette.common.white }} elevation={0}>
                <Toolbar>
                    <Typography sx={{ ml: 2, flex: 1, fontWeight: 600, textAlign: 'center' }} variant="h6" component="div">
                        {`Select a ${category}`}
                    </Typography>
                    <IconButton
                        edge="end"
                        color="inherit"
                        onClick={handleClose}
                        aria-label="close"
                    >
                        <CloseIcon />
                    </IconButton>
                </Toolbar>
            </AppBar>
        );
    };

    return (
        <Dialog
            fullScreen={fullScreen}
            open={open}
            onClose={handleClose}
        >
            {renderDialogHeader()}
            <SearchListOldVer fullScreen={fullScreen} list={categoryOptionsMap[category]} search={doSearch} handleClose={handleClose} />
      </Dialog>
    );
}

export default CategoryOptionsDialog;
