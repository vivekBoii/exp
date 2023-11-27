import {
  Image,
  Box,
  Center,
  Heading,
  Text,
  Stack,
  Avatar,
  useColorModeValue,
} from "@chakra-ui/react";
import about1 from "../assets/about1.png"
import about2 from "../assets/about2.png"
import about3 from "../assets/about3.png"

const About = () => {
  return (
    <>
        <Box w={'full'} minH={"84vh"}>
            <Heading fontFamily={"poppins"} textAlign={"center"} my={"5"}>About</Heading>
            <Box minW={"7xl"} margin={"auto"} display={"flex"} gap={"30"} alignItems={"center"} justifyContent={"center"}>
                <Cards src={about1} h={"Frequently Asked Questions"} d={"Updates on safe Shopping in our Stores"}/>
                <Cards src={about2} h={"Online Payment Process"} d={"Updates on safe Shopping in our Stores"}/>
                <Cards src={about3} h={"Home Delivery Options"} d={"Updates on safe Shopping in our Stores"}/>
            </Box>
        </Box>
    </>
  )
};

export default About;

const Cards = ({src,h,d}) => {
  return (
    <Center py={6} fontFamily={"poppins"}>
      <Box
        maxW={"445px"}
        w={"full"}
        // eslint-disable-next-line react-hooks/rules-of-hooks
        bg={useColorModeValue("white", "gray.900")}
        boxShadow={"xl"}
        rounded={"md"}
        p={6}
        overflow={"hidden"}
      >
        <Box
          h={"210px"}
          bg={"gray.100"}
          mt={-6}
          mx={-6}
          mb={6}
          pos={"relative"}
        >
          <Image
            src={
                src
            }
            fill
            alt='Example'
          />
        </Box>
        <Stack>
          <Text
            color={"green.500"}
            textTransform={"uppercase"}
            fontWeight={800}
            fontSize={"sm"}
            letterSpacing={1.1}
            textAlign={""}
          >
            Blog
          </Text>
          <Heading
            // eslint-disable-next-line react-hooks/rules-of-hooks
            color={useColorModeValue("gray.700", "white")}
            fontSize={"2xl"}
            fontFamily={"poppins"}
            mt={"4"}
            mb={"2"}
            textAlign={"center"}
          >{h}
          </Heading>
          <Text textAlign={"center"} color={"gray.500"}>
            {d}
          </Text>
        </Stack>
      </Box>
    </Center>
  );
};
