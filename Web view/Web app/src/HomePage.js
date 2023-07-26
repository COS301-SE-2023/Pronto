import * as React from 'react';
import "./App.css"
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActions, colors } from '@mui/material';
import Box from '@mui/material/Box';
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
        <Grid item xs={3} className="CardContainer">
          <Box
            sx={{
              maxWidth: 2000,
              borderRadius: '20px',
              '& .MuiCard-root': {
                transition: 'transform 0.2s ease-in-out', // Adding transition for the floating effect
              },
              '& .MuiCard-root:hover': {
                transform: 'translateY(-10px)', // Applying the floating effect on hover
                boxShadow: '0px 14px 28px rgba(0, 0, 0, 0.25), 0px 10px 10px rgba(0, 0, 0, 0.22)', // Adjust the shadow as per your preference
              },
            }}
          >
            <Card sx={{ maxWidth: 2000, borderRadius: '10px', boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)' }}>

              <CardContent>
                <CardMedia
                  component="img"
                  height="110" // Set the desired height of the logo

                  image={ProntoSvg} // Use the imported Pronto logo SVG
                  alt="Pronto Logo"
                  sx={{ display: 'block', marginBottom: 2, paddingTop: '1em', objectFit: 'contain' }}
                />

                <Grid container spacing={2}>
                  <Grid item xs={6}>
                    <Card sx={{ maxWidth: 400, borderRadius: '10px', boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.4)' }}>
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
                        <Button sx={{ borderRadius: '20px', backgroundColor: "#e32f45", marginBottom: 5 }} size="small" color="error" variant="contained" href="/institution-login">
                          Continue as institution &#8594;
                        </Button>
                      </CardActions>
                    </Card>
                  </Grid>

                  <Grid item xs={6}>
                    <Card sx={{ maxWidth: 400, borderRadius: '10px', boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.4)' }}>
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
                        <Button sx={{ borderRadius: '20px', backgroundColor: "#e32f45", marginBottom: 5 }} size="small" color="error" variant="contained" href="/lecturer-login">
                          Continue as lecturer &#8594;
                        </Button>
                      </CardActions>
                    </Card>
                  </Grid>

                </Grid>
              </CardContent>
            </Card>
          </Box>
        </Grid>
      </Grid>
    </div>
  );
}
export default HomePage;