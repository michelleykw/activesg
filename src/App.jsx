import React, {useRef, useState, useEffect} from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider } from '@mui/material/styles'
import useMediaQuery from '@mui/material/useMediaQuery';
import { makeStyles } from '@mui/styles';
import { theme } from './theme';
import NavigationBar from './components/NavigationBar';
import FacilityViewPage from './pages/FacilityViewPage';
import ResultPage from './pages/ResultPage';
import FacilitiesPage from './pages/FacilitiesPage';
import NotFound from './pages/NotFound';
import Complete from './pages/Complete';

import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';

const useStyles = makeStyles(theme => ({

}));



function App() {
  const classes = useStyles();
  const isMobile = useMediaQuery('(max-width:600px)');
  const valueRef = useRef('')
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    if (window.localStorage.getItem('MTurkID') === null) {
      setShowForm(true);
    } else {
      setShowForm(false);
    }
  }, []);

  const sendValue = () => {
    window.localStorage.setItem('MTurkID', valueRef.current.value);
    setShowForm(false);
  };

  const MturkIDForm = () => {
    return (
      <Box sx={{m: 3}}>
        <Typography variant="h3">Welcome to our Experiment!</Typography>
        <Typography>To start, please input your MTurkID. </Typography>

        <Box
          component="form"
          sx={{
            '& > :not(style)': { m: 1, width: '25ch' },
          }}
          noValidate
          autoComplete="off"
        >
        <TextField id="standard-basic" label="MTurkID" variant="standard" inputRef={valueRef} />
        <Button sx={{color: 'success.main'}}onClick={sendValue}>Send</Button>
        </Box>
      </Box>
    );
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div className={classes.fullHeight}>
        {showForm && <MturkIDForm />}
        {!showForm && (isMobile ? (
          <BrowserRouter>
            <Routes>
              <Route path="/activesg/facilities/view/" element={<FacilityViewPage />} />
              <Route path="/activesg/facilities/result/" element={<ResultPage />} />
              <Route path="/activesg/complete" element={<Complete />} />
              <Route exact path="/activesg/facilities" element={<FacilitiesPage />} />
              <Route exact path="/activesg/programmes" element={<NotFound isNotFacility />} />
              <Route exact path="/activesg/home" element={<NotFound isNotFacility />} />
              <Route exact path="/activesg/buypass" element={<NotFound isNotFacility />} />
              <Route exact path="/activesg/gameon" element={<NotFound isNotFacility />} />
              <Route exact path="/activesg" element={<NotFound isNotFacility />} />
              <Route exact path="/" element={<NotFound isNotFacility />} />
            </Routes>
            <NavigationBar />
          </BrowserRouter>
        ) : (
          <NotFound isNotMobile />
        ))}
      </div>
    </ThemeProvider>
  );
}

export default App;