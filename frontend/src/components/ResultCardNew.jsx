import React, {useState, useEffect} from 'react';
import { useNavigate, useLocation } from "react-router-dom";
import { sendNetworkLog } from '../logging/logging.js';

import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Box from '@mui/material/Box';
import { CardActionArea } from '@mui/material';
import swimming from '../static/swimming.jpg';

function ResultCardOld({data}) {
    const location = useLocation();
    const navigate = useNavigate();

    const versionId = new URLSearchParams(location.search).get('version') || 1;

    const [slotsLeft, setSlotsLeft] = useState(0);

    const goToFacilityViewPage = loc => {
        sendNetworkLog('Clicked on: ' + loc, loc + ' card', '', versionId);
        navigate(`/facilities/view?version=${versionId}&location=${loc}`);
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


    return (
        <Card sx={{ maxWidth: '40vw', m:1}} style={{ border: "none", boxShadow: "none" }}>
            <CardActionArea onClick={() => goToFacilityViewPage(data.name)}>
                <Box
                    component="img"
                    sx={{width: 1, maxHeight: '120px', borderRadius: 2.5}}
                    src={swimming} />
                <CardContent>
                    <Typography variant="caption" color="white" sx={{padding: '4px', bgcolor: 'text.disabled', borderRadius: 2}}>
                        {data.sport}
                    </Typography>
                    <Box direction="row" sx={{mt: 1}}>
                        <Typography gutterBottom variant="caption" sx={{fontWeight: 600}}>
                            {data.area + ' '}
                        </Typography>
                        <Typography gutterBottom variant="caption">
                            • {data.name}
                        </Typography>
                    </Box>

                    <Typography variant="caption" color="success.main">
                        {slotsLeft} slots available
                    </Typography>
                </CardContent>
            </CardActionArea>
        </Card>
    );
}

export default ResultCardOld;
