import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import { makeStyles, useTheme } from '@mui/styles';
import { Dialog, Grid, Typography } from '@mui/material';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { Form, Formik } from 'formik';
import { addDays } from 'date-fns';
import { categoryOptionsMap } from '../resources/constants.jsx';
import DialogHeaderNew from './DialogHeaderNew';
import FormElement from '../form/FormElement.jsx';
import AppButton from '../components/AppButton.jsx';
import { sendNetworkLog } from '../logging/logging.js';

const useStyles = makeStyles(theme => ({
    applyButton: {
        backgroundColor: `${theme.palette.background.lightGrey} !important`,
        paddingLeft: theme.spacing(2),
        minHeight: theme.spacing(5),
        width: '100% !important',
        '&:hover': {
            backgroundColor: `${theme.palette.primary.main} !important`,
            color: `${theme.palette.common.white} !important`,
        },
    },
    applyButtonBackground: {
        padding: theme.spacing(2),
        boxShadow: `0px 0px 3px ${theme.palette.background.lightGrey}`,
        position: "fixed",
        backgroundColor: theme.palette.common.white,
        bottom: 0
    },
    my10: {
        marginTop: theme.spacing(10),
        marginBottom: theme.spacing(8)
    },
    px2: {
        paddingLeft: theme.spacing(2),
        paddingRight: theme.spacing(2),
    }, 
    pb3: {
        paddingBottom: theme.spacing(3)
    },
    headings: {
        fontWeight: `600 !important`
    },
    button: {
        fontWeight: `${400} !important`,
        color: `${theme.palette.text.secondary} !important`,
        right: theme.spacing(1),
        marginTop: `${theme.spacing(1)} !important`,
    }
}));

function FilterDialogNewVer({ open, handleClose, versionId }) {
    const classes = useStyles();
    const theme = useTheme();
    const navigate = useNavigate();
    const [showAllLocations, setShowAllLocations] = useState(false);
    const [showAllSports, setShowAllSports] = useState(false);

    const allLocationsNew = [
        'Ang Mo Kio', 'Bishan', 'Clementi', 'Hougang', 'Jurong East', 'Pasir Ris', 'Punggol', 'Sengkang', 'Woodlands', 'Yio Chu Kang'
    ];

    const initialValues = { 
        Availability: true,
        Location: [], // allLocationsNew,
        Sports: [], // categoryOptionsMap.Sport,
        dateRange: [{
            startDate: new Date(),
            endDate: addDays(new Date(), 14),
            key: 'selection'
        }]
    };

    const applyFilter = (values) => {
        handleClose();
        sendNetworkLog('Clicked on: Apply Filters', 'Apply Filters', `query=${JSON.stringify(values)}`, versionId);
        navigate(`/activesg/facilities/result?version=${versionId}&query=${JSON.stringify(values)}`);
    };

    const renderCheckboxRow = (title, value) => {
        return <FormElement type="checkbox" title={title} value={value} />
    }

    const renderCheckboxShow = (list, title) => {
        return list.map(item => renderCheckboxRow(title, item));
    };

    const renderCheckboxHide = (list, title) => {
        const top3 = list.slice(0, 3);
        return top3.map(item => renderCheckboxRow(title, item));
    };

    const toggleShowAll = title => {
        sendNetworkLog(`Clicked on: Toggle Show All for ${title} in Filter Dialog`, 'Toggle Show All Button', `category=${title}`, versionId);
        if (title === 'Location') {
            setShowAllLocations(!showAllLocations);
        } else if (title === 'Sports') {
            setShowAllSports(!showAllSports);
        }
    };

    const renderShowOrHideButton = (type, title) => {
        return (
            <AppButton 
                variant='text' 
                content={<Typography variant='h4'>{`${type} all ${title}`}</Typography>} 
                endIcon={type === 'Show' ? <KeyboardArrowDownIcon /> : <KeyboardArrowUpIcon />}
                className={classes.button}
                onClick={() => toggleShowAll(title)}
            />
        );
    };

    const renderCheckboxSection = (id, title, list) => {
        const isShowAll = {
            'Location': showAllLocations,
            'Sports': showAllSports
        };
        return (
            <Grid container item className={classes.pb3}>
                <Grid item xs={12} id={id}>
                    <Typography variant='h2' className={classes.headings}>{title}</Typography>
                </Grid>
                <Grid container item role="group" aria-labelledby={id}>
                    {isShowAll[title] ? (
                        renderCheckboxShow(list, title)
                    ) : (
                        renderCheckboxHide(list, title)
                    )}
                    {isShowAll[title] ? (
                        renderShowOrHideButton('Hide', title)
                    ) : (
                        renderShowOrHideButton('Show', title)
                    )}
                </Grid>
            </Grid>
        );
    };

    const renderForm = formikBag => {
        const { touched, errors, values, setFieldValue } = formikBag;
        return (
            <Form>
                <Grid container justify="flex-start" alignItems="flex-start" className={classes.px2}>
                    <FormElement 
                        type="toggle" 
                        toggle={values.Availability} 
                        header='Availability'
                        subheader='Show only available locations'
                        handleToggle={(e, r) => {
                            setFieldValue('Availability', r);
                            sendNetworkLog('Clicked on: Toggle Availability (Filter)', 'Availability Toggle (Filter)', `newAvailabilityQuery=${r}`, versionId);
                        }} 
                    />
                    {renderCheckboxSection("checkbox-group-location", 'Location', allLocationsNew)}
                    {renderCheckboxSection("checkbox-group-sport", 'Sports', categoryOptionsMap.Sport)}
                    <FormElement 
                        type="date" 
                        ranges={values.dateRange}
                        onDateChange={item => {
                            setFieldValue('dateRange', [item.selection]);
                            sendNetworkLog('Clicked on: Date Range (Filter)', 'Date Range (Filter)', `newDateRange=${[item.selection]}`, versionId);
                        }}
                    />
                </Grid>
                <Grid container item justifyContent="center" alignItems="center" className={classes.applyButtonBackground}>
                    <AppButton 
                        variant='filled' 
                        content="Apply" 
                        type="submit" 
                        className={classes.applyButton}
                    />
                </Grid>
            </Form>
        );
    }

    return (
        <Dialog
            fullScreen
            open={open}
            onClose={handleClose}
        >
            <DialogHeaderNew header='Filter' handleClose={handleClose} />
            <Grid container className={classes.my10}>
                <Formik initialValues={initialValues} onSubmit={applyFilter}> 
                    {formikBag => renderForm(formikBag)}
                </Formik>
            </Grid>
      </Dialog>
    );
}

export default FilterDialogNewVer;
