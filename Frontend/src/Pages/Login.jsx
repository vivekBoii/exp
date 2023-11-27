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
import { useSelector, useDispatch } from "react-redux";
import { loginRequest } from "../Redux/User/userReducer";
import Loader from "../Component/Spinner/Spinner";
import AlertBox from "../Component/Alert/Alert";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";

export default function SimpleCard() {
  const dispatch = useDispatch();
  const location = useLocation();
  const status = useSelector((state) => state.user.status);
  const error = useSelector((state) => state.user.error);
  let navigateTo = useNavigate();


  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: (values) => {
      dispatch(loginRequest(values));
    }
  });

  const redirect = location.search?`/${location.search.split("=")[1]}`:"/account";

  useEffect(() => {
    if(status==="authenticated"){
      navigateTo(redirect);
    }
  }, [status])
  
  return (
    <>
      {error &&<AlertBox type='error' message={"Invalid Email Id or Password"} />}
  
    <Flex
      minH={{base:"80vh",md:"85vh"}}
      justify={"center"}
      bg={useColorModeValue("gray.50", "gray.800")}
      fontFamily={"poppins"}
    >
      <Stack spacing={8} mx={"auto"} maxW={"lg"} mt={"20"} py={12} px={6}>
        <Stack align={"center"}>
          <Heading fontWeight={500} color={"#003D29"} fontFamily={"poppins"} fontSize={"3xl"}>Sign in to your account</Heading>
        </Stack>
        <Text
          display={"flex"}
          fontSize={"md"}
          justifyContent={"center"}
        >
          Discover all of our cool Products ✌️
        </Text>
        
        {
          status==="loading"?(<Loader/>):(
            
              <form onSubmit={formik.handleSubmit}>
                <VStack spacing={4} align="flex-start">
                  <FormControl>
                    <FormLabel htmlFor="email">Email Address</FormLabel>
                    <Input
                      isRequired
                      id="email"
                      name="email"
                      type="email"
                      variant="filled"
                      onChange={formik.handleChange}
                      value={formik.values.email}
                    />
                  </FormControl>
                  <FormControl>
                    <FormLabel htmlFor="password">Password</FormLabel>
                    <Input
                      isRequired
                      id="password"
                      name="password"
                      type="password"
                      variant="filled"
                      onChange={formik.handleChange}
                      value={formik.values.password}
                    />
                  </FormControl>
                  <Box marginLeft={"auto"} color={"blue.400"}>
                      <Link color="green" to="/password/forgot"><Text color={"green"}>Forgot Password ?</Text></Link>
                  </Box>
                  <Button type="submit" colorScheme="green" width="full">
                    Login
                  </Button>
                </VStack>
              </form>
            
          )
        }
        
      </Stack>
    </Flex>
    </>
  );
}
