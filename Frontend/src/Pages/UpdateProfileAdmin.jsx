import React from "react";
import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Button,
  Heading,
  VStack,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import { useFormik } from "formik";
import { useState } from "react";
import Loader from "../Component/Spinner/Spinner";
import AlertBox from "../Component/Alert/Alert";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  UpdateUserAdmin,
    getSingleUserAdmin,
  loadUserRequest,
  updateProfileRequest,
} from "../Redux/User/userReducer";
import AvatarImg from "../assets/Avatar.jpg";

const UpdateProfileAdmin = () => {
  const dispatch = useDispatch();
  let navigateTo = useNavigate();
  const user = useSelector((state) => state.user.adminUser.user);
  const status = useSelector((state) => state.user.status);
  const [role, setrole] = useState("")
  const [userName, setuserName] = useState("");
  const [userEmail, setuserEmail] = useState("");

  const {id} = useParams();

  useEffect(() => {
    if(!user || (user._id!==id)){
      dispatch(getSingleUserAdmin(id));
    }
    else{
      setuserName(user.name);
      setuserEmail(user.email);
      setrole(user.role);
    }
  }, [dispatch,user]);

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      role: "",
    },
    onSubmit: async (values) => {
      values.name=userName;
      values.role=role;
      values.email=userEmail;
      dispatch(UpdateUserAdmin({id,values}));
      navigateTo(`/admin/users`);
    },
  });

  return (
    <>
      <Flex
        minH={{ base: "80vh", md: "85vh" }}
        justify={"center"}
        bg={useColorModeValue("gray.50", "gray.800")}
        fontFamily={"poppins"}
      >
        <Stack spacing={8} mx={"auto"} maxW={"lg"} mt={"10"} py={12} px={6}>
          <Stack align={"center"}>
            <Heading
              textAlign={"center"}
              fontWeight={500}
              fontFamily={"poppins"}
              fontSize={"3xl"}
            >
              Edit Profile
            </Heading>
          </Stack>
          { status === "loading" ? (
            <Loader />
          ) : (
            <form onSubmit={formik.handleSubmit}>
              <VStack spacing={4} align='flex-start'>
                <FormControl>
                  <FormLabel htmlFor='name'>Name</FormLabel>
                  <Input
                    isRequired
                    id='name'
                    name='name'
                    type='text'
                    variant='filled'
                    onChange={(e) => {
                      setuserName(e.target.value);
                    }}
                    value={userName}
                  />
                </FormControl>
                <FormControl>
                  <FormLabel htmlFor='email'>Email Address</FormLabel>
                  <Input
                    isRequired
                    id='email'
                    name='email'
                    type='email'
                    variant='filled'
                    onChange={(e) => {
                      setuserEmail(e.target.value);
                    }}
                    value={userEmail}
                  />
                </FormControl>
                <FormControl>
                  <FormLabel htmlFor='role'>Role</FormLabel>
                  <Input
                    isRequired
                    id='role'
                    name='role'
                    type='text'
                    variant='filled'
                    onChange={(e) => {
                      setrole(e.target.value);
                    }}
                    value={role}
                  />
                </FormControl>
                <Button type='submit' colorScheme='blue' width='full'>
                  Update Profile
                </Button>
              </VStack>
            </form>
          )}
        </Stack>
      </Flex>
    </>
  );
};

export default UpdateProfileAdmin;
