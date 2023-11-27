import { Stack, Box, Heading, Image, Text } from "@chakra-ui/react";
import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import Loader from "../Component/Spinner/Spinner";

const Profile = () => {
  const status = useSelector((state) => state.user.status);
  const user = useSelector((state) => state.user.user);
  let navigateTo = useNavigate();

  useEffect(() => {
    if (status === "error") {
      navigateTo("/login");
    }
  }, [status]);

  return (
    <>
      <Box
        maxW={"10xl"}
        m={{ base: "2", sm: "10" }}
        fontFamily={"poppins"}
        h={{ md: "74vh" }}
      >
        <Stack
          direction={{ base: "column", md: "row" }}
          justifyContent={"space-around"}
          alignItems={"center"}
          h={"100%"}
        >
          {status === "loading" ? (
            <Loader />
          ) : user ? (
            <>
              <>
                <Stack gap={"10"} alignItems={"center"}>
                  <Heading
                    fontFamily={"poppins"}
                    fontWeight={"600"}
                    textAlign={"center"}
                  >
                    My Profile
                  </Heading>
                  <Image
                    boxSize={"200px"}
                    borderRadius={"50%"}
                    src={user.avatar.url}
                    alt={""}
                  />
                  <Box
                    width={"100%"}
                    display={"flex"}
                    backgroundColor={"green.500"}
                    color={"white"}
                    borderRadius={"5"}
                    alignItems={"center"}
                    h={"10"}
                    justifyContent={"center"}
                  >
                    <Link to='/me/update' width={"100%"}>
                      Edit Profile
                    </Link>
                  </Box>
                </Stack>
                <Stack p={5} gap={"10"} textAlign={"left"} alignItems={"start"}>
                  <Stack alignItems={"start"} justifyContent={"center"}>
                    <Heading
                      fontWeight={"600"}
                      fontSize={"2xl"}
                      fontFamily={"poppins"}
                      textAlign={"center"}
                    >
                      Full Name :
                    </Heading>
                    <Text fontWeight={"400"} fontSize={"2xl"}>
                      {user.name}
                    </Text>
                  </Stack>
                  <Stack alignItems={"start"} justifyContent={"center"}>
                    <Heading
                      fontWeight={"600"}
                      fontSize={"2xl"}
                      fontFamily={"poppins"}
                      textAlign={"center"}
                    >
                      Email :
                    </Heading>
                    <Text fontWeight={"400"} fontSize={"2xl"}>
                      {user.email}
                    </Text>
                  </Stack>
                  <Stack alignItems={"start"} justifyContent={"center"}>
                    <Heading
                      fontWeight={"600"}
                      fontSize={"2xl"}
                      fontFamily={"poppins"}
                      textAlign={"center"}
                    >
                      Joined On :
                    </Heading>
                    <Text fontWeight={"400"} fontSize={"2xl"}>{String(user.createdAt.slice(0,10))}</Text>
                  </Stack>
                  <Box
                    width={"100%"}
                    display={"flex"}
                    backgroundColor={"green.500"}
                    color={"white"}
                    borderRadius={"5"}
                    alignItems={"center"}
                    h={"10"}
                    justifyContent={"center"}
                  >
                    <Link to={"/order/me"} width={"100%"}>
                      My Orders
                    </Link>
                  </Box>
                  <Box
                    width={"100%"}
                    display={"flex"}
                    backgroundColor={"green.500"}
                    color={"white"}
                    borderRadius={"5"}
                    alignItems={"center"}
                    h={"10"}
                    justifyContent={"center"}
                  >
                    <Link to={"/password/update"} width={"100%"}>
                      Change Password
                    </Link>
                  </Box>
                </Stack>
              </>
            </>
          ) : null}
        </Stack>
      </Box>
    </>
  );
};

export default Profile;
