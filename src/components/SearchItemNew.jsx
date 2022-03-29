import React, { useEffect, useState } from 'react';
import { makeStyles, useTheme } from '@mui/styles';
import { Chip, Grid, Typography } from '@mui/material';
import data from '../pages/data/data.json';
import { sportsList } from '../resources/constants.jsx';

const useStyles = makeStyles(theme => ({
    row: {
        paddingBottom:  theme.spacing(1.5),
        paddingTop:  theme.spacing(1.5),
        borderBottom: `1px solid ${theme.palette.background.midGrey}`
    },
    chip: {
        fontWeight: `${600} !important`,
    },
    pbHalf: {
        paddingBottom: theme.spacing(0.5)
    },
    availability: {
        textAlign: 'right'
    },
    px1: {
        paddingLeft: theme.spacing(1),
        paddingRight: theme.spacing(1)
    },
    icon: {
        color: `${theme.palette.background.midGrey} !important`,
        padding: `0 !important`
    },
}));

function SearchItemNew({ name, onClick}) {
    // sport, area, availability,
    const classes = useStyles();
    const [availability, setAvailability] = useState(0);
    const [area, setArea] = useState();
    const [sport, setSport] = useState('Others');
    const [isSport, setIsSport] = useState(false);

    useEffect(() => {
        for (let i = 0; i < data.length; i++) {
            setIsSport(sportsList.includes(name));

            if (data[i].name !== name) {
                continue;
            }
            const avail = data[i]?.availability;
            let sum = avail?.map(item => Object.values(item['time']));
            sum = sum.map(arr => arr.map(tuple => Object.values(tuple)[0]));
            sum = sum.map(lst => lst.reduce((x, y) => parseInt(x) + parseInt(y)));
            sum = sum.reduce((x, y) => x + y);
            setAvailability(sum);
            setArea(data[i].area);
            setSport(data[i].sport);
        }
    }, [name]);

    if (isSport) {
        return (
            <Grid container onClick={onClick} justifyContent="space-between" alignItems="center" className={`${classes.row}`}>
                <Grid item xs={12}>
                    <Chip
                        label={
                            <Typography variant='body2' className={classes.chip}>{name}</Typography>
                        } 
                        color='greyChip'
                    />
                </Grid>
            </Grid>
        );
    }
    
    return (
        <Grid container onClick={onClick} justifyContent="space-between" alignItems="center" className={`${classes.row}`}>
            <Grid item xs={6} className={classes.pbHalf}>
                <Chip
                    label={
                        <Typography variant='body2' className={classes.chip}>{sport}</Typography>
                    } 
                    color='greyChip'
                />
            </Grid>
            <Grid item xs={6}>
                <Typography color={availability > 0 ? "secondary" : 'primary'} variant='body2' className={classes.availability}>
                    {availability} slot{availability > 1 ? 's' : ''} available
                </Typography>
            </Grid>
            <Grid item xs={12}>
                <Typography color="textSecondary" variant={'body1'}>
                    {area && `${area} · `}{name}
                </Typography>
            </Grid>
        </Grid>
    );
}

export default SearchItemNew;
