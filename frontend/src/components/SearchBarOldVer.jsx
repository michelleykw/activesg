import React, { useEffect, useState } from 'react';
import { makeStyles } from '@mui/styles';
import { styled } from '@mui/material/styles';
import CancelIcon from '@mui/icons-material/Cancel';
import SearchIcon from '@mui/icons-material/Search';
import FilterListIcon from '@mui/icons-material/FilterList';
import { Button, Grid, InputBase } from '@mui/material';

const useStyles = makeStyles(theme => ({
    icon: {
        color: theme.palette.background.darkGrey
    },
    mr1: {
        marginRight: theme.spacing(1)
    },
    mx2: {
        marginLeft: theme.spacing(2),
        marginRight: theme.spacing(2)
    }
}));

const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    outline: `1px solid ${theme.palette.background.midGrey}`,
    width: '100%'
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: theme.palette.background.darkGrey,
    '& .MuiInputBase-input': {
        padding: theme.spacing(0.75, 1),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        width: '100%',
    },
}));

const CancelButton = styled(Button)(({ theme }) => ({
    color: theme.palette.text.secondary,
    textTransform: 'capitalize',
    fontWeight: 400,
    fontSize: '1.125rem',
    padding: 0,
    minWidth: '4rem'
  }));

function SearchBarOldVer({ isSearching=false, openFilterDialog, closeFilterDialog, startSearch, resetSearchInput, cancelSearch, doSearch, searchInput, hasSearchValues, updateHasSearchValues, updateSearchOptions, isResultPage, displayBack }) {
    const classes = useStyles();
    const [query, setQuery] = useState();

    useEffect(() => {
        console.log(hasSearchValues);
        setQuery(hasSearchValues);
    }, [hasSearchValues]);

    const onInputSearch = e => {
        const searchInput = e.target.value;
        setQuery(searchInput);
        updateHasSearchValues(searchInput);
        console.log('##onInputSearch (searchInput):', searchInput);
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
    };

    const getPlaceholder = () => {
        return query && query.length > 0 ? query : isSearching ? 'Enter Sport / Venue' : 'Search Facilities'
    };

    const renderSearchBar = (params) => {
        return (
            <Search onClick={startSearch} onKeyUp={onInputSearch}>
                <SearchIconWrapper>
                    <SearchIcon fontSize="large" className={classes.icon} />
                </SearchIconWrapper>
                <div className={classes.alignCenter}>
                    <StyledInputBase
                        {...params}
                        
                        disabled={!isSearching}
                        fullWidth
                        placeholder={getPlaceholder()}
                        inputProps={{ 'aria-label': 'search' }}
                        inputRef={searchInput}
                        endAdornment={!isSearching ? (
                            <FilterListIcon fontSize="large" onClick={openFilterDialog} className={`${classes.icon} ${classes.mr1}`} />
                        ) : (
                            <CancelIcon onClick={onResetSearchInput} className={`${classes.cancelIcon} ${classes.mr1}`} />
                        )}
                    />
                </div>
            </Search>
        );
    };

    return (
        <Grid container justifyContent="space-between" alignItems="center" className={classes.mx2}>
            <Grid item xs={isSearching ? 10 : 12}>
                {renderSearchBar()}
            </Grid>
            <Grid item>
                {isSearching && (
                    <CancelButton variant="text" onClick={onCancelSearch}>Cancel</CancelButton>
                )}
            </Grid>
        </Grid>
    );
}

export default SearchBarOldVer;