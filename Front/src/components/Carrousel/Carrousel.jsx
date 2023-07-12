import React from "react";
import Carousel from 'react-material-ui-carousel'
import { Box , Typography } from '@mui/material';
import img1 from "../../assets/6.jpg"
import img2 from "../../assets/LoginImage.jpg"



const Carrousel = () =>{

    var items = [
        {
            name: "Random Name #1",
            description: "¡ Rifas todas las semanas, proba y gana !",
            img:img1
        },
        {
            name: "Random Name #2",
            description: "Tus pagos estan 100% protegidos",
            img: img2
        }
    ]

    return(
        <div style={{marginTop:"16px"}}>
        <Carousel>
            {
                items.map( (item, i) => <><Box  sx={{display:"flex", justifyContent:"center"}} key={i} item={item}>
                <img src={item.img} style={{width:"100%", maxWidth:"1012px", height:"100%", maxHeight:"400px"}}></img>
                <Typography sx={{position:"absolute", fontSize:"28px", fontWeight:"600",color:"white", display:"flex", alignItems:"center", marginTop:"25%"}}>
                    {item.description}</Typography>
                </Box></> )
            }
        </Carousel>
        </div>
    )
}

export default Carrousel