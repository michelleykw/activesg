import React, { useEffect, useState } from 'react';
import { makeStyles, useTheme } from '@mui/styles';
import { Grid, Typography } from '@mui/material';
import { DateRange } from 'react-date-range';
import { addDays } from 'date-fns';
import 'react-date-range/dist/styles.css'; // main css file
import 'react-date-range/dist/theme/default.css'; // theme css file
import { ClassNames } from '@emotion/react';
// import AdapterDateFns from '@mui/lab/AdapterDateFns';
// import LocalizationProvider from '@mui/lab/LocalizationProvider';


const useStyles = makeStyles(theme => ({
    dateRange: {
        minWidth: '100%',
        color: theme.palette.text.secondary,
    },
    headings: {
        color: "#849095",
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: theme.spacing(1),
        paddingBottom: theme.spacing(1),
        paddingLeft: theme.spacing(1),
        paddingRight: theme.spacing(1)
    }
}));

function DatePicker(props) {
    const { ranges, onDateChange, ...rest } = props;
    const classes = useStyles();
    const theme = useTheme();

    // const [value, setValue] = useState();

    return (
        <Grid container justitfyContent="center" alignItems="center">
            <Grid item xs={12}>
                <Typography className={classes.headings}>Date</Typography>
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


                {/* Test different date picker */}
                {/* <LocalizationProvider dateAdapter={AdapterDateFns}> */}
                    {/* <DatePicker
                        // label="Basic example"
                        value={value}
                        onChange={(newValue) => {
                            setValue(newValue);
                        }}
                        ranges={[{
                            startDate: value,
                            endDate: value,
                            key: 'selection'
                        }]}
                        // onChange={onDateChange}
                        renderInput={(params) => <TextField {...params} />}
                    /> */}
                {/* </LocalizationProvider> */}
            </Grid>
        </Grid>
    );
}

export default DatePicker;