
import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActions } from '@mui/material';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';

function HomePage() {
  return (

    <Container maxWidth="100%" fixed bgcolor = "#e32f45" >

    <Card sx={{maxWidth:2000}}>
      <CardMedia
      component="img"
      height="140"
      image="./Authentication/Institution/ProntoLogo.png"
      alt="logo"
      />
      <CardContent>

      <Grid container spacing={2}>
      <Grid item xs={6}>
        <Card sx={{ maxWidth: 400 }}>
            <CardMedia
              component="img"
              height="140"
              image="/static/images/cards/contemplative-reptile.jpg"
              alt="Institution"
            />
            <CardContent>
              <Typography gutterBottom variant="h4" component="div">
                Institution Admin
              </Typography>
              <Typography variant="body2" color="text.secondary">
                If you would like to sign into an admin account for a registered Institution, click the button below:
              </Typography>
            </CardContent>
          <CardActions>
            <Button size="small" color="error" href="/institution-login">
              Sign in
            </Button>
          </CardActions>
        </Card>
        </Grid>

        <Grid item xs={6}>
        <Card sx={{ maxWidth: 400 }}>
            <CardMedia
              component="img"
              height="140"
              image="/static/images/cards/contemplative-reptile.jpg"
              alt="Institution"
            />
            <CardContent>
              <Typography gutterBottom variant="h4" component="div">
                Lecturer
              </Typography>
              <Typography variant="body2" color="text.secondary">
                If you would like to sign into or create a Lecturer account for a registered institution, click the button below:
              </Typography>
            </CardContent>
          <CardActions>
            <Button size="small" color="error" href="/lecturer-login">
              Sign in/Register
            </Button>
          </CardActions>
        </Card>
        </Grid>

      </Grid>
      </CardContent>
    </Card>

    </Container>
  );
}
export default HomePage;
