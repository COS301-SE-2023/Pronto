import * as React from 'react';
import "./App.css"
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActions, colors } from '@mui/material';
import Grid from '@mui/material/Grid';
import ProntoSvg from './Authentication/Institution/ProntoLogo.svg';

function HomePage() {
  return (
    <div className="BG">
      <Grid
        container
        spacing={0}
        direction="column"
        alignItems="center"
        justifyContent="center"
        sx={{ minHeight: '100vh' }}
      >
        <Grid item xs={3} className="CardContainer"> {/* Add className here */}

          <Card sx={{ maxWidth: 2000, borderRadius: '20px' }} style={{ border: "1px solid #5a5a5a", backgroundColor: "#e32f45" }}>
            <CardMedia
              component="img"
              height="150"
              src={ProntoSvg}
              alt="logo"
              sx={{ padding: "1em 1em 0 1em", objectFit: "contain" }}
            />
            <CardContent>
              <Typography color={"white"} gutterBottom variant="h4" component="div" align="center" sx={{ fontWeight: 'bold', m: 1 }}>
                Welcome to Pronto!
              </Typography>

              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <Card sx={{ maxWidth: 400, borderRadius: '10px' }} style={{ border: "1px solid #e32f45" }}>
                    <CardMedia
                      component="img"
                      height="150"
                      image={require("./images/Institution.png")}
                      alt="Institution"
                      sx={{ padding: "1em 1em 0 1em", objectFit: "contain" }}
                    />
                    <CardContent>
                      <Typography gutterBottom variant="h4" component="div" align="center">
                        Institution Admin
                      </Typography>
                      <Typography variant="body2" color="text.secondary" align="center">
                        If you would like to sign into an admin account for a registered Institution, click the button below:
                      </Typography>
                    </CardContent>
                    <CardActions style={{ justifyContent: 'center' }}>
                      {/* Add the custom styles to the Button component */}
                      <Button sx={{ borderRadius: '20px', backgroundColor: "#e32f45" }} size="small" color="error" variant="contained" href="/institution-login">
                        Continue as institution
                      </Button>
                    </CardActions>
                  </Card>
                </Grid>

                <Grid item xs={6}>
                  <Card sx={{ maxWidth: 400, borderRadius: '10px' }} style={{ border: "1px solid #e32f45" }}>
                    <CardMedia
                      component="img"
                      height="150"
                      image={require("./images/Lecturer.jpg")}
                      alt="Institution"
                      sx={{ padding: "1em 1em 0 1em", objectFit: "contain" }}
                    />
                    <CardContent>
                      <Typography gutterBottom variant="h4" component="div" align="center">
                        Lecturer
                      </Typography>
                      <Typography variant="body2" color="text.secondary" align="center">
                        If you would like to sign into, or create a Lecturer account for a registered institution, click the button below:
                      </Typography>
                    </CardContent>
                    <CardActions style={{ justifyContent: 'center' }}>
                      {/* Add the custom styles to the Button component */}
                      <Button sx={{ borderRadius: '20px', backgroundColor: "#e32f45" }} size="small" color="error" variant="contained" href="/lecturer-login">
                        Continue as lecturer
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