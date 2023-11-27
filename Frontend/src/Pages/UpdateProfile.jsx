// loading laga 
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
import { loadUserRequest, updateProfileRequest } from "../Redux/User/userReducer";
import AvatarImg from "../assets/Avatar.jpg";

const UpdateProfile = () => {
  const dispatch = useDispatch();
  let navigateTo = useNavigate();
  const status = useSelector((state) => state.user.status);
  const user = useSelector((state) => state.user.user);
  const error = useSelector((state) => state.user.error);
  const [avatarPreview, setAvatarPreview] = useState(AvatarImg);
  const [avatar, setAvatar] = useState(AvatarImg);
  const [userName, setuserName] = useState(user.name)
  const [userEmail, setuserEmail] = useState(user.email)

  useEffect(() => {
    if(user){
      setuserName(user.name);
      setuserEmail(user.email);
      setAvatar(user.avatar.url);
      setAvatarPreview(user.avatar.url)
    }
  }, [status,user]);

  const formik = useFormik({
    initialValues:{
      name:"",
      email:"",
      avatar:"",
    },
    onSubmit: async(values) => {
      values.avatar = avatar;
      values.name=userName;
      values.email=userEmail;
      dispatch(updateProfileRequest(values));
      dispatch(loadUserRequest(values));
      <AlertBox type={"success"} message={"Updated Successfully"}/>
      if (status === "authenticated") {
        navigateTo(`/account`);
      }
    },
  });


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

  if (status === "loading" || !user) {
    return <Loader />;
  }


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
                      onChange={(e)=>{setuserName(e.target.value)}}
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
                      onChange={(e)=>{setuserEmail(e.target.value)}}
                      value={userEmail}
                    />
                  </FormControl>
                  <Text fontWeight={500}>Avatar</Text>
                  <img src={avatarPreview} alt='Avatar Preview' />
                  <input
                    type='file'
                    name='avatar'
                    accept='image/*'
                    onChange={registerDataChange}
                  />
                  <Button type='submit' colorScheme='green' width='full'>
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

export default UpdateProfile;
