import React from 'react';
import { Box, Typography } from '@mui/material';

//-------------------- Assets --------------------------
import cardImg from '../../assets/cardImg.webp';

//////////////////////////////////
const RifaCard = ({ rifa }) => {
 return (
  <Box
   sx={{
    width: '300px',
    height: '300px',
    background:"#FFA840",
    backgroundSize: 'contain',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    borderRadius: 2,
    
    padding: '1rem',
    textAlign: 'center',
    transition: '0.3s',
    '&:hover': {
     boxShadow: ' 0px 5px 61px 6px #FFA840',
    },
   }}>
    
   <Typography
    variant='body1' // HACER RESPONSIVE CARD
    fontSize='1.54em'
    textOverflow='ellipsis'
    style={{ color: '#c4bdbd', backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
    {rifa.product}
   </Typography>
   <img
    src={rifa.imgProduct}
    alt={rifa.product}
    style={{
     width: '100%',
     height: '240px',
     
     marginBottom: '1rem',
     boxShadow: '0px 5px 8px 0px rgba(0,0,0,0.75)',
     borderRadius: 2,
    }}
   />
   <Typography sx={{fontSize:"18px", fontWeight:"500", color:"green"}}>$ {rifa.numbersPrice}</Typography>
   
  </Box>
 );
};

/////////////////////

export default RifaCard;
