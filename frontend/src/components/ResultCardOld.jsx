import React from 'react';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import { CardActionArea } from '@mui/material';
import swimming from '../static/swimming.jpg';
import { useNavigate, useLocation } from "react-router-dom";

function ResultCardOld({data}) {
    const location = useLocation();
    const navigate = useNavigate();

    const versionId = new URLSearchParams(location.search).get('version') || 1;

    const goToFacilityViewPage = loc => {
        navigate(`/facilities/view?version=${versionId}&location=${loc}`);
    };

    console.log(data);

    return (
        <Card sx={{ maxWidth: 192, m:1}}>
            <CardActionArea onClick={() => goToFacilityViewPage(data.name)}>
                <CardMedia
                    component="img"
                    height="90"
                    src = {swimming}
                    alt={data.sport}
                />
                <CardContent>
                <Typography variant="caption" color="text.secondary">
                    {data.sport}
                </Typography>
                <Typography gutterBottom variant="caption" component="div">
                    {data.name}
                </Typography>
                <Typography variant="caption" color="text.secondary">
                    0.0km
                </Typography>
                </CardContent>
            </CardActionArea>
        </Card>
    );
}

export default ResultCardOld;
