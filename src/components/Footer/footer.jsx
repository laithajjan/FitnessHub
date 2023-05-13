import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Link from '@mui/material/Link';
import { IconButton } from '@mui/material';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import TwitterIcon from '@mui/icons-material/Twitter';

function Footer() {
  return (
    <Box sx={{ bgcolor: '#144971', color: 'white', py: 6, fontFamily: 'Arial, sans-serif' }}>
      <Container maxWidth="lg">
        <Grid container spacing={4} justifyContent="center">
          <Grid item xs={12} sm={4}>
            <Typography variant="h6" gutterBottom sx={{ color: '#71A6C7' }}>
              About Us
            </Typography>
            <Typography variant="body2">
              Learn more about our team, our mission, and our dedication to providing the best information and services for you.
            </Typography>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Typography variant="h6" gutterBottom sx={{ color: '#71A6C7' }}>
              Quick Links
            </Typography>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
              <li>
                <Link href="#" color="inherit" underline="none" sx={{ my: 1, display: 'block' }}>
                  Home
                </Link>
              </li>
              <li>
                <Link href="#" color="inherit" underline="none" sx={{ my: 1, display: 'block' }}>
                  Blog
                </Link>
              </li>
              <li>
                <Link href="#" color="inherit" underline="none" sx={{ my: 1, display: 'block' }}>
                  About Us
                </Link>
              </li>
              <li>
                <Link href="#" color="inherit" underline="none" sx={{ my: 1, display: 'block' }}>
                  Contact
                </Link>
              </li>
            </ul>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Typography variant="h6" gutterBottom sx={{ color: '#71A6C7', textAlign: 'center' }}>
              Follow Us
            </Typography>
            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
              <IconButton aria-label="Facebook" color="inherit" size="large">
                <FacebookIcon />
              </IconButton>
              <IconButton aria-label="Instagram" color="inherit" size="large">
                <InstagramIcon />
              </IconButton>
              <IconButton aria-label="Twitter" color="inherit" size="large">
                <TwitterIcon />
              </IconButton>
            </Box>
          </Grid>
        </Grid>
        <Box mt={4} textAlign="center">
          <Typography variant="body1">
            © 2023 FitnessHub. All Rights Reserved.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
}

export default Footer;
