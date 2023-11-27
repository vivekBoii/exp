import {
  Container,
  Flex,
  Box,
  Heading,
  Text,
  IconButton,
  Button,
  VStack,
  HStack,
  Wrap,
  WrapItem,
} from "@chakra-ui/react";
import { MdPhone, MdEmail, MdLocationOn } from "react-icons/md";
import { BsGithub, BsDiscord, BsLinkedin } from "react-icons/bs";

export default function Contact() {
  return (
    <Container maxW='full' mt={0} minH={"84vh"} centerContent overflow='hidden'>
      <Flex>
        <Box
          color='black'
          fontFamily={"poppins"}
          borderRadius='lg'
          m={{ sm: 4, md: 16, lg: 10 }}
          p={{ sm: 5, md: 5, lg: 16 }}
        >
          <Box p={4}>
            <Wrap spacing={{ base: 20, sm: 3, md: 5, lg: 20 }}>
              <WrapItem>
                <Box>
                  <Heading
                    textAlign={"center"}
                    color={"003D29"}
                    fontFamily={"poppins"}
                  >
                    Contact
                  </Heading>
                  <Text
                    textAlign={"center"}
                    mt={{ sm: 3, md: 3, lg: 5 }}
                    color='green.500'
                  >
                    Fell Free to Contact
                  </Text>
                  <Box py={{ base: 5, sm: 5, md: 8, lg: 10 }}>
                    <VStack pl={0} spacing={3} alignItems='flex-start'>
                      <Button
                        size='md'
                        height='48px'
                        width='300px'
                        variant='solid'
                        colorScheme='green'
                        leftIcon={<MdPhone size='20px' />}
                      >
                        +91-7017094609
                      </Button>
                      <Button
                        size='md'
                        height='48px'
                        width='300px'
                        variant='solid'
                        colorScheme='green'
                        leftIcon={<MdEmail size='20px' />}
                      >
                        yadav100adu@gmail.com
                      </Button>
                      <Button
                        size='md'
                        height='48px'
                        width='300px'
                        variant='solid'
                        colorScheme='green'
                        leftIcon={<MdLocationOn size='20px' />}
                      >
                        Meerut, India
                      </Button>
                    </VStack>
                  </Box>
                  <HStack
                    mt={{ lg: 10, md: 10 }}
                    spacing={5}
                    px={5}
                    w={"300px"}
                    justifyContent={"space-evenly"}
                    alignItems='flex-start'
                  >
                    <a href='https://www.linkedin.com/in/vivekboii/' target="_blank">
                      <IconButton
                        aria-label='linkedin'
                        variant='ghost'
                        size='lg'
                        isRound={true}
                        _hover={{ bg: "green.500", color: "white" }}
                        icon={<BsLinkedin size='28px' />}
                      />
                    </a>

                    <a href='https://github.com/vivekBoii' target="_blank">
                      <IconButton
                        aria-label='github'
                        variant='ghost'
                        size='lg'
                        isRound={true}
                        _hover={{ bg: "green.500", color: "white" }}
                        icon={<BsGithub size='28px' />}
                      />
                    </a>

                    <a href='https://discordapp.com/users/1045282387812171796' target="_blank">
                      <IconButton
                        aria-label='discord'
                        variant='ghost'
                        size='lg'
                        isRound={true}
                        _hover={{ bg: "green.500", color: "white" }}
                        icon={<BsDiscord size='28px' />}
                      />
                    </a>
                  </HStack>
                </Box>
              </WrapItem>
            </Wrap>
          </Box>
        </Box>
      </Flex>
    </Container>
  );
}
