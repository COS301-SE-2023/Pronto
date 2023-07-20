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
    
    <Container maxWidth="false" 
    justify="center"
    alignitems="center"
    bgcolor = "#e32f45" >

    <Card sx={{maxWidth:2000}}>
      <CardMedia
      component="img"
      height="200"
      image={require("./Authentication/Institution/ProntoLogo.png")}
      alt="logo"
      sx={{ padding: "1em 1em 0 1em", objectFit: "contain" }}
      />
      <CardContent>
      <Typography gutterBottom variant="h4" component="div" align="center">
                  Welcome to Pronto timetable application
      </Typography>
      <Typography gutterBottom variant="h4" component="div" align="center"></Typography>

        <Grid container spacing={2}>
        <Grid item xs={6}>
          <Card sx={{ maxWidth: 400 }} style={{ border: "1px solid #5a5a5a" }}>
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
              <Button size="small" color="error" href="/institution-login">
                Sign in
              </Button>
            </CardActions>
          </Card>
          </Grid>

          <Grid item xs={6}>
          <Card sx={{ maxWidth: 400 }}  style={{ border: "1px solid #5a5a5a" }}>
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
