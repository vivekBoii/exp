import { Box, Image } from "@chakra-ui/react";
import React from "react";
import not from "../assets/not.jpg"

const NotFound = () => {
  return (
    <Box
      w={"full"}
      minH={"84vh"}
      display={"flex"}
      alignItems={"center"}
      justifyContent={"center"}
    >
      <Box
        display={"flex"}
        alignItems={"center"}
        justifyContent={"center"}
        flexDirection={"column"}
      >
        <Image h={"70vh"} src={not} alt="404 Not Found"/>
      </Box>
    </Box>
  );
};

export default NotFound;
