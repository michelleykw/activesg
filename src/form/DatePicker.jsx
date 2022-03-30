import React from 'react';
import { makeStyles, useTheme } from '@mui/styles';
import { Grid, Typography } from '@mui/material';
import { DateRange } from 'react-date-range';
import { addDays } from 'date-fns';
import 'react-date-range/dist/styles.css'; // main css file
import 'react-date-range/dist/theme/default.css'; // theme css file
import { ClassNames } from '@emotion/react';

const useStyles = makeStyles(theme => ({
    dateRange: {
        minWidth: '100%',
        color: theme.palette.text.secondary,
    },
    headings: {
        fontWeight: `600 !important`,
        paddingBottom: theme.spacing(1)
    }
}));

function DatePicker(props) {
    const { ranges, onDateChange, ...rest } = props;
    const classes = useStyles();
    const theme = useTheme();

    return (
        <Grid container justitfyContent="center" alignItems="center">
            <Grid item xs={12}>
                <Typography variant='h2' className={classes.headings}>Date</Typography>
            </Grid>
            <Grid item xs={12}>
                <DateRange
                    onChange={onDateChange}
                    months={1}
                    maxDate={addDays(new Date(), 14)}
                    minDate={new Date()}
                    direction="vertical"
                    scroll={{ enabled: true }}
                    ranges={ranges}
                    rangeColors={[theme.palette.primary.main]}
                    color={theme.palette.primary.main}
                    showSelectionPreview={false}
                    className={classes.dateRange}
                />
            </Grid>
        </Grid>
    );
}

export default DatePicker;