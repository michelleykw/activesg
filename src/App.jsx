import React from 'react';
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


const useStyles = makeStyles(theme => ({

}));

function App() {
  // plan out the various versions
  // input the data format, need to find a way to not change it when doing the survey
  // does state helps? -- keep track of state at the first page and link to everywhere else
  // sth like defaultData
  const classes = useStyles();
  const isMobile = useMediaQuery('(max-width:600px)');
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div className={classes.fullHeight}>
        {isMobile ? (
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
        )}
      </div>
    </ThemeProvider>
  );
}

export default App;