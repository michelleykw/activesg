import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
    palette: {
        primary: {
            main: '#E95050'
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
            darkGrey: '#444444'
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
        }
    }
});
