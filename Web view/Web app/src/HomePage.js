import React, { useEffect, useState } from 'react';
import "./App.css"
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActions, Card } from '@mui/material';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import ProntoSvg from './Authentication/Institution/ProntoLogo.svg';

function HomePage() {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // After the component has mounted, set the isLoaded state to true
    setIsLoaded(true);
  }, []);

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

        <Box
          sx={{
            maxWidth: 2000,
            backgroundColor: "transparent", // Set the background color to transparent
            borderRadius: '20px',
            '& .MuiCard-root': {
              transform: 'translateY(0)',
              transition: 'transform 0.2s ease-in-out',
            },
            '& .MuiCard-root:hover': {
              transform: 'translateY(-10px)',
              boxShadow: '0px 14px 28px rgba(0, 0, 0, 0.25), 0px 10px 10px rgba(0, 0, 0, 0.22)',
            },
            opacity: isLoaded ? 1 : 0, // Set initial opacity to 0 (hidden) and animate to 1 (visible)
            transition: 'opacity 1s ease-in-out', // Define the animation duration and timing function
          }}
        >


          <CardContent>
            <CardMedia
              component="img"
              height="110" // Set the desired height of the logo
              image={ProntoSvg} // Use the imported Pronto logo SVG
              alt="Pronto Logo"
              sx={{ display: 'block', marginBottom: 3, paddingTop: '1em', objectFit: 'contain' }}
            />

            <Grid container spacing={2}>

              <Grid item xs={6}>


                <Card sx={{ maxWidth: 400, borderRadius: '10px', boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.4)', opacity: isLoaded ? 1 : 0, transition: 'opacity 1s ease-in-out 0.2s' }}>
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
                    <Button
                      className="custom-button" // Add the custom class name here
                      sx={{ borderRadius: '20px', backgroundColor: "#e32f45", marginBottom: 5 }}
                      size="small"
                      color="error"
                      variant="contained"
                      href="/institution-login"
                    >
                      Continue as institution &#8594;
                    </Button>
                  </CardActions>
                </Card>
              </Grid>

              <Grid item xs={6}>
                <Card sx={{ maxWidth: 400, borderRadius: '10px', boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.4)', opacity: isLoaded ? 1 : 0, transition: 'opacity 1s ease-in-out 0.2s' }}>
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
                    <Button className="custom-button" // Add the custom class name here
                      sx={{ borderRadius: '20px', backgroundColor: "#e32f45", marginBottom: 5 }}
                      size="small"
                      color="error"
                      variant="contained" href="/lecturer-login">
                      Continue as lecturer &#8594;
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
            </Grid>
          </CardContent>
        </Box>
      </Grid>
    </div >
  );
}

export default HomePage;
