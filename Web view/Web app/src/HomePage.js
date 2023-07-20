//import ProntoLogo from "./Authentication/Institution/ProntoLogo.png";
import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions } from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';

function HomePage() {
  return (

    <React.Fragment>
      <CssBaseline />
      <Container maxWidth="sm">
        <Box sx={{ bgcolor: '#FFFFFF', height: '100vh' }} />

        <Card sx={{ maxWidth: 345 }}>
        <CardActionArea>
          <CardMedia
            component="img"
            height="140"
            image="/static/images/cards/contemplative-reptile.jpg"
            alt="Institution"
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              Institution
            </Typography>
            <Typography variant="body2" color="text.secondary">
              If you would like to sign into an admin account for a registered Institution, click the button below:
            </Typography>
          </CardContent>
        </CardActionArea>
        <CardActions>
          <Button size="small" color="primary">
            Login
          </Button>
        </CardActions>
      </Card>

      </Container>
    </React.Fragment>
  );
}
export default HomePage;
