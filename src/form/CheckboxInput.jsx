import React from 'react';
import { useLocation } from "react-router-dom";
import { makeStyles } from '@mui/styles';
import { Grid, Typography } from '@mui/material';
import { Field } from 'formik';
import { sendNetworkLog } from '../logging/logging.js';

const useStyles = makeStyles(theme => ({
    row: {
        paddingBottom:  theme.spacing(1.5),
        paddingTop:  theme.spacing(1.5),
        borderBottom: `1px solid ${theme.palette.background.midGrey}`
    },
    checkbox: {
        minWidth: theme.spacing(2),
        minHeight: theme.spacing(2)
    },
    fullWidth: {
        width: '100%'
    }
}));

function CheckboxInput(props) {
    const { title, value, ...rest } = props;
    const classes = useStyles();
    const location = useLocation();

    const onClick = () => {
        const versionId = new URLSearchParams(location.search).get('version');
        sendNetworkLog(`Clicked on: ${title} Checkbox (Filters) - ${value}`, `${title} Checkbox (Filters) - ${value}`, `Filter by ${title} - ${value}`, versionId);
    };

    return (
        <Grid container item className={`${classes.row}`} onClick={onClick}>
            <label className={classes.fullWidth}>
                <Grid container item justifyContent="space-between" alignItems="center">
                    <Grid item>
                        <Typography color="textSecondary" variant='h3'>{value}</Typography>
                    </Grid>
                    <Grid item>
                        <Field id={title} name={title} value={value} type="checkbox" className={classes.checkbox}/>
                    </Grid>
                </Grid>
            </label>
        </Grid>
    );
}

export default CheckboxInput;