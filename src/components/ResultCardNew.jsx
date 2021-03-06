import React, {useState, useEffect} from 'react';
import { useNavigate, useLocation } from "react-router-dom";
import { sendNetworkLog } from '../logging/logging.js';

import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import Grid from '@mui/material/Grid';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Box from '@mui/material/Box';
import { CardActionArea } from '@mui/material';
import swimming from '../static/swimming.jpg';
import hockey from '../static/hockey.jpeg';
import badminton from '../static/badminton.jpg';


function ResultCardNew({data}) {
    const location = useLocation();
    const navigate = useNavigate();

    const versionId = new URLSearchParams(location.search).get('version') || 1;

    const [slotsLeft, setSlotsLeft] = useState(0);

    const goToFacilityViewPage = loc => {
        sendNetworkLog('Clicked on: ' + loc, loc + ' card', '', versionId);
        navigate(`/activesg/facilities/view?version=${versionId}&location=${loc}`);
    };

    useEffect(() => {
        if (data) {
            const avail = data.availability;
            let sum = avail.map(item => Object.values(item['time']));
            sum = sum.map(arr => arr.map(tuple => Object.values(tuple)[0]));
            sum = sum.map(lst => lst.reduce((x, y) => parseInt(x) + parseInt(y)));
            sum = sum.reduce((x, y) => x + y);
            setSlotsLeft(sum);
        }
    }, [data])

    const pic = () => {
        if (data.sport === 'Swim'){
            return swimming;
        } else if (data.sport === 'Badminton') {
            return badminton;
        } else if (data.sport === 'Hockey') {
            return hockey;
        } else {
            return swimming; // default
        }
    }


    return (
        <Grid item xs={6}>
            <Card sx={{m:1}} style={{ border: "none", boxShadow: "none" }}>
                <CardActionArea onClick={() => goToFacilityViewPage(data.name)}>
                    <Box
                        component="img"
                        sx={{width: 1, maxHeight: '100px', borderRadius: 2.5}}
                        src={pic()} />
                    <CardContent sx={{mx: -1.7, my: -1}}>
                        <Typography variant="caption" color="white" sx={{padding: '4px', bgcolor: 'text.disabled', borderRadius: 2, fontSize: 12}}>
                            {data.sport}
                        </Typography>
                        <Box direction="row" sx={{mt: 1}}>
                            <Box direction="row" sx={{mt: 1}}>
                                <Typography gutterBottom variant="caption" sx={{fontWeight: 600, fontSize: 16}}>
                                    {data.area + ' '}
                                </Typography>
                                <Typography gutterBottom variant="caption" sx={{fontSize: 16}}>
                                    ??? {data.name}
                                </Typography>
                            </Box>
                        </Box>
                        <Typography variant="caption" color="success.main" sx={{fontSize: 14}}>
                            {slotsLeft} slots available
                        </Typography>
                    </CardContent>
                </CardActionArea>
            </Card>
        </Grid>
    );
}

export default ResultCardNew;
