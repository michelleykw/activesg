import React, { useEffect, useState } from 'react';
import { useParams, useLocation, useNavigate } from "react-router-dom";

import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

import ResultCardNew from '../components/ResultCardNew';

function YouMayAlsoLike({data, currFacilityName, useOldResult, selectedDate, setSelectedDate, setSelectedTime, dates}) {

    const [randomFac, setRandomFac] = useState([]);

    useEffect(() => {
        if (data.length > 0) {
            const removeCurr = data.filter(data => data.name != currFacilityName);
            const newRandFac = []
            const rand1 = removeCurr[Math.floor(Math.random() * removeCurr.length)];
            newRandFac.push(rand1);
            const rand2 = removeCurr[Math.floor(Math.random() * removeCurr.length)];
            newRandFac.push(rand2);
            setRandomFac(newRandFac);
        }
    }, [data])

    return (
        <Grid container direction="column" sx={{ml: 2, mb:25}}>
            <Box sx={{mt: 1}}>
                {!useOldResult && (
                    <Typography inline align="left" gutterBottom variant="h6" sx={{fontWeight: 600}}>
                        You may also like this
                    </Typography>
                )}
            </Box>

            <Grid container direction="row" alignItems="flex-start" justifyContent="flex-start" maxHeight='90px' maxWidth='90vw'>
                {randomFac.map(item => < ResultCardNew data={item} />)}
            </Grid>
        </Grid>
    )
}

export default YouMayAlsoLike;