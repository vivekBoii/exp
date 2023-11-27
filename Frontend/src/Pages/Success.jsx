import { Text , Box, Image } from '@chakra-ui/react';
import React from 'react';
import { Link } from 'react-router-dom';
import tick from "../assets/accept.png";


const Success = () => {
  return (
    <>
        <Box w={"7xl"} minH={"85vh"} fontFamily={"poppins"} display={"flex"} flexDirection={"column"} alignItems={"center"} justifyContent={"center"} margin={"auto"}>
          <Image h={"20"} w={"20"} src={tick} alt=''/>
          <Text mt={"4"}>
              Your Order has been Placed SuccessFully
          </Text>
          <Link to={"/order/me"}>
            <Text color={"green"}
            _hover={{
              textDecoration:"underline",
            }}
            >View Orders</Text>
          </Link>
        </Box>
    </>
  )
}

export default Success