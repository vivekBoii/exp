// forward to login page 
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
import { Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { SignUpRequest } from "../Redux/User/userReducer";
import AvatarImg from "../assets/Avatar.jpg";

export default function SignUp() {
  const [avatarPreview, setAvatarPreview] = useState(AvatarImg);
  const [avatar, setAvatar] = useState(AvatarImg);
  const dispatch = useDispatch();
  let navigateTo = useNavigate();
  const status = useSelector((state) => state.user.status);
  const error = useSelector((state) => state.user.error);

  const registerDataChange = (e) => {
    if (e.target.name === "avatar") {
      const reader = new FileReader();

      reader.onload = () => {
        if (reader.readyState === 2) {
          setAvatarPreview(reader.result);
          setAvatar(reader.result);
        }
      };
      
      reader.readAsDataURL(e.target.files[0]);
    }
  };
  useEffect(() => {
    if (status === "success") {
      navigateTo(`/account`);
    }
  }, [status, avatarPreview]);

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      avatar: "",
    },
    onSubmit: (values) => {
      values.avatar = avatar;
      dispatch(SignUpRequest(values));
    },
  });
  return (
    <>
      {error && (
        <AlertBox type='error' message={"Invalid SignUp Credentials"} />
      )}
      <Flex
        minH={{ base: "80vh", md: "85vh" }}
        justify={"center"}
        bg={useColorModeValue("gray.50", "gray.800")}
        fontFamily={"poppins"}
      >
        <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
          <Stack align={"center"}>
            <Heading
              textAlign={"center"}
              fontWeight={500}
              fontFamily={"poppins"}
              fontSize={"3xl"}
              color={"#003D29"}
            >
              Sign up to your account
            </Heading>
          </Stack>
          <Text
            display={"flex"}
            fontSize={"md"}
            justifyContent={"center"}
          >
            <Text >Discover all of our cool Products </Text>{" "}
            ✌️
          </Text>
          {status === "loading" ? (
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
                    onChange={formik.handleChange}
                    value={formik.values.name}
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
                    onChange={formik.handleChange}
                    value={formik.values.email}
                  />
                </FormControl>
                <FormControl>
                  <FormLabel htmlFor='password'>Password</FormLabel>
                  <Input
                    isRequired
                    id='password'
                    name='password'
                    type='password'
                    variant='filled'
                    onChange={formik.handleChange}
                    value={formik.values.password}
                  />
                </FormControl>
                <Text fontWeight={"500"}>Upload Your Avatar</Text>
                <img src={avatarPreview} alt='Avatar Preview' />
                <input
                  type='file'
                  name='avatar'
                  accept='image/*'
                  onChange={registerDataChange}
                />
                <Button type='submit' colorScheme='green' width='full'>
                  Sign Up
                </Button>
              </VStack>
            </form>
          )}
        </Stack>
      </Flex>
    </>
  );
}
