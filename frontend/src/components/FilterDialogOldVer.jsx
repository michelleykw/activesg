import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import { makeStyles, useTheme } from '@mui/styles';
import { Dialog, Grid, Typography } from '@mui/material';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import SearchListOldVer from '../components/SearchListOldVer';
import CategoryOptionsDialog from '../components/CategoryOptionsDialog';
import { Form, Formik } from 'formik';
import { addDays } from 'date-fns';
import { categoryOptionsMap } from '../resources/constants.jsx';
import FormElement from '../form/FormElement.jsx';
import sportsList from '../resources/constants';
import venueList from '../resources/constants';
import AppButton from '../components/AppButton.jsx';

const useStyles = makeStyles(theme => ({
    applyButton: {
        backgroundColor: `${theme.palette.primary.main} !important`,
        color: `${theme.palette.common.white} !important`,
        paddingLeft: theme.spacing(2),
        minHeight: theme.spacing(5),
        width: '30% !important',
        '&:hover': {
            backgroundColor: `${theme.palette.primary.main} !important`,
            color: `${theme.palette.common.white} !important`,
        },
    },
    resetButton: {
        backgroundColor: `${theme.palette.common.white} !important`,
        paddingLeft: theme.spacing(2),
        minHeight: theme.spacing(5),
        width: '30% !important',
        '&:hover': {
            backgroundColor: `${theme.palette.primary.main} !important`,
            color: `${theme.palette.common.white} !important`,
        },
    },
    applyButtonBackground: {
        padding: theme.spacing(2),
        boxShadow: `0px 0px 3px ${theme.palette.background.lightGrey}`,
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
    filterHeader: {
        backgroundColor: `${theme.palette.background.lightGrey}`,
        width: '100%',
        paddingTop: theme.spacing(1),
        paddingBottom: theme.spacing(1),
        paddingLeft: theme.spacing(3)
    },
    headings: {
        fontWeight: `600 !important`
    },
    subheading: {
        color: "#849095"
    },
    button: {
        fontWeight: `${400} !important`,
        color: `${theme.palette.text.secondary} !important`,
        right: theme.spacing(1),
        marginTop: `${theme.spacing(1)} !important`,
    },
    selectionBox: {
        fontWeight: `${400} !important`,
        minHeight: theme.spacing(8),
        width: '100%',
        color: `${theme.palette.text.secondary} !important`,
        marginTop: `${theme.spacing(1)} !important`,
        marginBottom: `${theme.spacing(1)} !important`,
    },
    dateContainer: {
        paddingTop: theme.spacing(2),
        paddingLeft: theme.spacing(2),
        paddingRight: theme.spacing(2),
    },
    divider: {
        backgroundColor: `${theme.palette.background.lightGrey}`,
        height: '8px',
        width: '100%'
    }
}));

function FilterDialogOldVer({ open, handleClose, versionId, doSearch }) {
    const classes = useStyles();
    const theme = useTheme();
    const navigate = useNavigate();
    const [showAllLocations, setShowAllLocations] = useState(false);
    const [showAllSports, setShowAllSports] = useState(false);

    const [openCategoryOptions, setOpenCategoryOptions] = useState(false);
    const [searchCategory, setSearchCategory] = useState();

    useEffect(() => {
    }, [openCategoryOptions, searchCategory]);

    const initialValues = { 
        Availability: false,
        Location: [], // allLocationsNew,
        Sports: [], // categoryOptionsMap.Sport,
        dateRange: [{
            startDate: new Date(),
            endDate: addDays(new Date(), 14),
            key: 'selection'
        }]
    };

    const applyFilter = (values) => {
        console.log("--> apply filter");
        console.log('Filter:', values);
        handleClose();
        navigate(`/facilities/result?version=${versionId}&query=${JSON.stringify(values)}`);
    };

    const resetFilter = (values) => {
        values = initialValues;
    }

    const toggleShowAll = title => {
        if (title === 'Location') {
            setShowAllLocations(!showAllLocations);
        } else if (title === 'Sports') {
            setShowAllSports(!showAllSports);
        }
    };

    // const renderShowOrHideButton = (type, title) => {
    //     return (
    //         <AppButton 
    //             variant='text' 
    //             content={<Typography variant='h4'>{`${type} all ${title}`}</Typography>} 
    //             endIcon={type === 'Show' ? <KeyboardArrowDownIcon /> : <KeyboardArrowUpIcon />}
    //             className={classes.button}
    //             onClick={() => toggleShowAll(title)}
    //         />
    //     );
    // };

    const openCategoryOptionsDialog = category => {
        console.log('--> openCategoryOptionsDialog');
        setOpenCategoryOptions(true);
        setSearchCategory(category);
    };

    const closeCategoryOptionsDialog = () => {
        console.log('--> closeCategoryOptionsDialog');
        setOpenCategoryOptions(false);
        setSearchCategory(null);
    };

    const renderCategoryDialog = () => {
        console.log('--> renderCategoryDialog');
        return (
            <CategoryOptionsDialog
                doSearch={doSearch}
                category={searchCategory}
                open={openCategoryOptions}
                fullScreen
                handleClose={closeCategoryOptionsDialog}
            />
        );
    };

    // const getQuery = (type, values) => {
    //     let newQuery = new URLSearchParams(location.search).get('query');
    //     if (openCategoryOptions && type === 'Sport') {
    //         values.Sports.push(newQuery);
    //     } 
    //     // else if (openCategoryOptions && type === 'Venue') {
    //     //     values.Location.push(newQuery);
    //     // } 
    // }

    const renderSelectSection = (id, title, titleInput) => {
        return (
            <Grid container item id={id}>
                <AppButton 
                    variant='text' 
                    content={
                    <Grid justify="flex-start">
                        <Typography className={classes.subheading}>{title}</Typography>
                        <Typography variant='h4' className={classes.headings}>{titleInput}</Typography>
                    </Grid>
                    } 
                    endIcon={<NavigateNextIcon />}
                    className={classes.selectionBox}
                    onClick={() => openCategoryOptionsDialog(title)}
                />
                {renderCategoryDialog()}
                {/* {getQuery(title, values)} */}
            </Grid>
        );
    };

    const renderForm = formikBag => {
        const { touched, errors, values, setFieldValue } = formikBag;
        console.log('Formik', values);
        return (
            <Form>
                <Grid container justify="flex-start" alignItems="flex-start">
                    <Grid className = {classes.filterHeader}>{"Filter"}</Grid>
                    {renderSelectSection("checkbox-group-location", 'Venue', 'Select a Venue')}
                    <Grid className = {classes.divider}></Grid>
                    {renderSelectSection("checkbox-group-sport", 'Sport', 'Select a Sport')}
                    <Grid className = {classes.divider}></Grid>
                    {/* {renderSelectSection("checkbox-group-date", 'Date')}
                    <Grid className = {classes.divider}></Grid> */}
                    <Grid container className={classes.dateContainer}>
                        <FormElement 
                            type="date" 
                            ranges={values.dateRange}
                            onDateChange={item => setFieldValue('dateRange', [item.selection])}
                        />
                    </Grid>
                </Grid>
                <Grid container item justifyContent="space-evenly" alignItems="center" className={classes.applyButtonBackground}>
                    <AppButton 
                        variant='outlined' 
                        content="Reset" 
                        className={classes.resetButton}
                        onClick={() => resetFilter(values)}
                    />
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
            open={open}
            onClose={handleClose}
        >
            <Grid container>
                <Formik initialValues={initialValues} onSubmit={applyFilter}> 
                    {formikBag => renderForm(formikBag)}
                </Formik>
            </Grid>
      </Dialog>
    );
}

export default FilterDialogOldVer;
