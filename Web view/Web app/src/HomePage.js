import * as React from 'react';
import "./App.css"
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActions } from '@mui/material';
import Grid from '@mui/material/Grid';

function HomePage() {
  return (
  <div className = "BG">
    <Grid
    container
    spacing={0}
    direction="column"
    alignItems="center"
    justifyContent="center"
    sx={{ minHeight: '100vh' }}>

    <Grid item xs={3}>

    <Card sx={{maxWidth:2000}} style={{ border: "1px solid #000000" }}>
      <CardMedia
      component="img"
      height="150"
      image={require("./Authentication/Institution/ProntoLogo.png")}
      alt="logo"
      sx={{ padding: "1em 1em 0 1em", objectFit: "contain" }}
      />
      <CardContent>
      <Typography gutterBottom variant="h4" component="div" align="center" sx={{ fontWeight: 'bold', m: 1 }}>
                  Welcome to Pronto timetable application!
      </Typography>

        <Grid container spacing={2}>
        <Grid item xs={6}>
          <Card sx={{ maxWidth: 400 }} style={{ border: "1px solid #e32f45" }}>
              <CardMedia
                component="img"
                height="150"
                image={require("./images/Institution.png")}
                alt="Institution"
                sx={{ padding: "1em 1em 0 1em", objectFit: "contain" }}
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
              <Button size="small" color="error"  variant="contained" href="/institution-login">
                Sign in
              </Button>
            </CardActions>
          </Card>
          </Grid>

          <Grid item xs={6}>
          <Card sx={{ maxWidth: 400 }}  style={{ border: "1px solid #e32f45" }}>
              <CardMedia
                component="img"
                height="150"
                image={require("./images/Lecturer.jpg")}
                alt="Institution"
                sx={{ padding: "1em 1em 0 1em", objectFit: "contain" }}
              />
              <CardContent>
                <Typography gutterBottom variant="h4" component="div">
                  Lecturer
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  If you would like to sign into, or create a Lecturer account for a registered institution, click the button below:
                </Typography>
              </CardContent>
            <CardActions>
              <Button size="small" color="error" variant="contained" href="/lecturer-login">
                Sign in/Register
              </Button>
            </CardActions>
          </Card>
          </Grid>

        </Grid>
      </CardContent>
    </Card>

    </Grid>
    </Grid>  
    </div> 
  );
}
export default HomePage;
