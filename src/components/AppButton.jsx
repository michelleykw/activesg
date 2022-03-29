import React from 'react';
import { makeStyles } from '@mui/styles';
import Button from '@mui/material/Button';

const useStyles = makeStyles(theme => ({
    button: {
        borderRadius: theme.spacing(4),
        height: theme.spacing(4),
        '&:hover': {
            backgroundColor: theme.palette.primary.dark,
            color: theme.palette.primary.contrastText
        },
    },
    old: {
        color: `${theme.palette.text.primary} !important`
    }
}));

function AppButton({ href, content, onClick, icon, endIcon, variant, disabled = false, type = "button", version = 'old', className }) {
    const classes = useStyles();

    if (href) {
        return (
            <Button
                href={href}
                disabled={disabled}
                variant={variant || "outlined"}
                startIcon={icon}
                endIcon={endIcon}
                onClick={onClick}
                type={type}
                className={`${classes.button} ${className} ${classes[type]}`}
            >
                {content}
            </ Button>
        );
    }

    return (
        <Button
            disabled={disabled}
            variant={variant || "outlined"}
            startIcon={icon}
            endIcon={endIcon}
            onClick={onClick}
            type={type}
            className={`${classes.button} ${classes[version]} ${className}`}
        >
            {content}
        </ Button>
    );
}

export default AppButton;