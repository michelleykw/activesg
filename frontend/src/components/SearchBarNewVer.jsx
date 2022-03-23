import React, { useEffect } from 'react';
import { makeStyles } from '@mui/styles';
import { styled } from '@mui/material/styles';
import ClearIcon from '@mui/icons-material/Clear';
import FilterListIcon from '@mui/icons-material/FilterList';
import SearchIcon from '@mui/icons-material/Search';
import { Button, Grid, InputBase } from '@mui/material';

const useStyles = makeStyles(theme => ({
    icon: {
        color: theme.palette.background.darkGrey
    },
    mr1: {
        marginRight: theme.spacing(1)
    },
    px2: {
        paddingLeft: theme.spacing(2),
        paddingRight: theme.spacing(2)
    },
    alignCenter: {
        
    }
}));

const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: theme.spacing(3),
    outline: `1px solid ${theme.palette.background.lightGrey}`,
    background: theme.palette.background.lightGrey,
    width: '100%',
    minHeight: theme.spacing(6)
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: theme.palette.background.darkGrey,
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: theme.palette.background.darkGrey,
    padding: theme.spacing(0.75, 1),
    fontSize: '1.25rem',
    // fontWeight: 500,
    position: 'absolute',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    '& .MuiInputBase-input': {
        padding: theme.spacing(0.75, 1),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        width: '100%',
    },
}));

function SearchBarNewVer({ openFilterDialog, showFilter=true, startSearch, resetSearchInput, cancelSearch, doSearch, searchInput, updateHasSearchValues, updateSearchOptions, isResultPage }) {
    const classes = useStyles();

    const onInputSearch = e => {
        const searchInput = e.target.value;
        updateHasSearchValues(searchInput);
        updateSearchOptions(searchInput);

        if (e.keyCode == 13) {
            doSearch(searchInput);
        }
    };

    const onCancelSearch = e => {
        cancelSearch();
        searchInput.current.value = "";
    };

    const onResetSearchInput = () => {
        resetSearchInput();
        searchInput.current.value = "";
    }

    const renderSearchBar = (params) => {
        return (
            <Search onClick={startSearch} onKeyUp={onInputSearch}>
                <SearchIconWrapper>
                    <SearchIcon fontSize="large" className={classes.icon} />
                </SearchIconWrapper>
                <div className={classes.alignCenter}>
                    <StyledInputBase
                        {...params}
                        fullWidth
                        disabled={showFilter}
                        placeholder='Search'
                        inputProps={{ 'aria-label': 'search' }}
                        inputRef={searchInput}
                        endAdornment={showFilter ? (
                            <FilterListIcon fontSize="large" onClick={openFilterDialog} className={`${classes.icon} ${classes.mr1}`} />
                        ) : (
                            <ClearIcon fontSize="large"  onClick={onResetSearchInput} className={`${classes.icon} ${classes.mr1}`} />
                        )}
                    />
                </div>
            </Search>
        );
    };

    return (
        <Grid container justifyContent="space-between" alignItems="center" className={classes.px2}>
            {renderSearchBar()}
        </Grid>
    );
}

export default SearchBarNewVer;