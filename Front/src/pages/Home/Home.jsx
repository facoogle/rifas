import React from 'react';
import { Box } from '@mui/material';

//-------------------- Components --------------------------
import Footer from '../../components/footer/footer';
import NavBar from '../../components/navbar/navBar';
import CurrentRifas from '../../components/currentRifas/CurrentRifas';
import Carrousel from '../../components/Carrousel/Carrousel';
////////////////////////
const Home = () => {
 return (
  <Box
   sx={{
    height: '100vh',
    display: 'flex',
    flexDirection: 'column',
   }}>
   <NavBar />
   

   <Box
    sx={{ flex: '1 1 auto' }}
    bgcolor='#F5F5F5'>
      <Carrousel/>  
    <CurrentRifas />
   </Box>
   <Footer />
  </Box>
 );
};

///////////////////////

export default Home;
