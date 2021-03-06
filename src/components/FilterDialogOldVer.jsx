import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from "react-router-dom";
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
import { sportsList } from '../resources/constants.jsx';
import { venueList } from '../resources/constants.jsx';
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
        textAlign: "left",
        justifyContent: "flex-start",
        alignContent: "center",
        width: '100%',
        color: `${theme.palette.text.secondary} !important`,
        marginTop: `${theme.spacing(1)} !important`,
        marginBottom: `${theme.spacing(1)} !important`,
        paddingLeft: theme.spacing(3)
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
    const location = useLocation();
    const navigate = useNavigate();

    const [query, setNewQuery] = useState('');
    const [showAllLocations, setShowAllLocations] = useState(false);
    const [showAllSports, setShowAllSports] = useState(false);
    const [sportInput, setSportInput] = useState("Select a Sport");
    const [venueInput, setVenueInput] = useState("Select a Venue");
    const [isChangeSport, setIsChangeSport] = useState(false);
    const [isChangeVenue, setIsChangeVenue] = useState(false);

    const [openCategoryOptions, setOpenCategoryOptions] = useState(false);
    const [searchCategory, setSearchCategory] = useState();

    const initialValues = {
        Availability: false,
        Location: [], // allLocationsNew,
        Venue: [],
        Sports: [], // categoryOptionsMap.Sport,
        dateRange: [{
            startDate: new Date(),
            endDate: addDays(new Date(), 14),
            key: 'selection'
        }]
    };

    const isInsideList = (query, list) => {
        return list.some(item => item === query);
    }

    useEffect(() => {
        let newQuery = new URLSearchParams(location.search).get('query');
        if (isChangeSport && sportsList.find(ele => ele === newQuery)) {
            setSportInput(newQuery);
        }
        if (isChangeVenue && venueList.find(ele => ele === newQuery)) {
            setVenueInput(newQuery);
        }
    }, [query, openCategoryOptions, searchCategory, sportInput, venueInput, isChangeSport, isChangeVenue, location]);

    const applyFilter = (values) => {
        console.log("--> apply filter");
        updateFilterValues(values);
        console.log("--> done updateFilterValues");

        console.log('Filter:', values);
        handleClose();
        // navigate(`/activesg/facilities/result?version=${versionId}&query=${JSON.stringify(values)}`);
    };

    const resetFilter = (values) => {
        values = initialValues;
    }

    const updateFilterValues = (values) => {
        let newQuery = new URLSearchParams(location.search).get('query');

        if (isChangeSport && isInsideList(newQuery, sportsList)) {
            setSportInput(newQuery);
        }

        else if (isChangeVenue && isInsideList(newQuery, venueList)) {
            setVenueInput(newQuery);
        }

        if (sportInput === "Select a Sport") {
            values.Sports = [];
        } else {
            values.Sports = [sportInput];
        }

        if (venueInput === "Select a Venue") {
            values.Venue = [];
        } else {
            values.Venue = [venueInput];
        }
    }

    const openCategoryOptionsDialog = category => {
        console.log('--> openCategoryOptionsDialog');
        setOpenCategoryOptions(true);
        setSearchCategory(category);
        if (category === "Sport") {
            setIsChangeSport(true);
        } else if (category === "Venue") {
            setIsChangeVenue(true);
        }
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

    const renderSelectSection = (id, title) => {
        return (
            <Grid container item id={id}>

                <Grid container item xs={12} className={classes.selectionBox} onClick={() => openCategoryOptionsDialog(title)}>
                    <Grid item justify="flex-start"  xs={10}>
                        <Typography className={classes.subheading}>{title}</Typography>
                        <Typography variant='h4' className={classes.headings}>{
                            title === "Sport"
                                ? sportInput
                                : venueInput}</Typography>
                    </Grid>
                    <Grid container item xs={2} alignItems="center">
                        <NavigateNextIcon />
                    </Grid>
                </Grid>

                {renderCategoryDialog()}
            </Grid>
        );
    };

    const renderForm = formikBag => {
        const { touched, errors, values, setFieldValue } = formikBag;
        console.log('Formik', values);
        return (
            <Form>
                <Grid container justify="flex-start" alignItems="flex-start" fullWidth={true}>
                    <Grid className = {classes.filterHeader}>{"Filter"}</Grid>
                    {renderSelectSection("venue-selection", 'Venue')}
                    <Grid className = {classes.divider}></Grid>
                    {renderSelectSection("sport-selection", 'Sport')}
                    <Grid className = {classes.divider}></Grid>
                    {/* {renderSelectSection("checkbox-group-date", 'Date')}
                    <Grid className = {classes.divider}></Grid> */}
                    <Grid container className={classes.dateContainer}>
                        <FormElement
                            type="dateOld"
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

    console.log(sportInput)
    console.log(venueInput)

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
