import { createTheme } from '@mui/material/styles';

const settings = {
    palette: {
        primary: {
            main: '#E95050'
        },
        secondary: {
            main: '#25A969'
        },
        greyChip: {
            main: '#777777',
            contrastText: '#ffffff'
        },
        red: {
            main: '#CA1E1E',
            contrastText: '#ffffff'
        },
        sucess: {
            main: '#15A89E'
        },
        text: {
            primary: '#050207',
            secondary: '#444444',
            disable: '#D4D4D4',
        },
        background: {
            lightGrey: '#ECECEC',
            midGrey: '#D4D4D4',
            darkGrey: '#444444',
        }
    },
    typography: {
        h1: {
            fontWeight: 600,
            fontSize: '3rem',
            textTransform: 'capitalise'
        },
        h2: {
            fontWeight: 500,
            fontSize: '1.5rem',
            textTransform: 'capitalise'
        },
        h3: {
            fontWeight: 500,
            fontSize: '1.33rem',
            textTransform: 'capitalise'
        },
        h4: {
            fontWeight: 500,
            fontSize: '1.17rem',
            textTransform: 'capitalise'
        },
        body1: {
            fontWeight: 400,
            fontSize: '1.1rem'
        },
        body2: {
            fontWeight: 400,
            fontSize: '1rem'
        },
        button: {
            fontWeight: 600,
            fontSize: '1rem',
            letterSpacing: 0,
            textTransform: 'capitalise'
        },
        subtitle1: {
            fontWeight: 400,
            fontSize: '1.5rem'
        },
        subtitle2: {
            fontWeight: 500,
            fontSize: '1.25rem'
        },
        caption: {
            fontWeight: 400,
            fontSize: '0.85rem'
        },
        fontFamily: "\"Montserrat\", sans-serif"
    }
};

// const versionIndex = parseInt((window.location.search).search('version')) + 8;
// if (window.location.search.substring(versionIndex) === '3') {
//     settings.typography.fontFamily = "\"Montserrat\", sans-serif";
// }

export const theme = createTheme(settings);
