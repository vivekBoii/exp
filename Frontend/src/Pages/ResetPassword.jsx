import {
    Flex,
    FormControl,
    FormLabel,
    Input,
    Stack,
    Button,
    Heading,
    VStack,
    useColorModeValue,
  } from "@chakra-ui/react";
  import { useFormik } from "formik";
  import Loader from "../Component/Spinner/Spinner";
  import AlertBox from "../Component/Alert/Alert";
  import { useNavigate , useParams } from "react-router-dom";
  import { useEffect } from "react";
  import { useSelector, useDispatch } from "react-redux";
  import { loadUserRequest, resetPasswordRequest } from "../Redux/User/userReducer";
  
  const ResetPassword = () => {
    const dispatch = useDispatch();
    let navigateTo = useNavigate();
    const status = useSelector((state) => state.user.status);
    const error = useSelector((state) => state.user.error);
    const { token } = useParams();
  
    useEffect(() => {
        if(status === "notAuthenticated") {
            navigateTo(`/login`);
        }
    }, [status]);
  
    const formik = useFormik({
      initialValues: {
        token:token,
        password: "",
        confirmPassword: "",
      },
      onSubmit: async (values) => {
        dispatch(resetPasswordRequest(values));
        // yaha pe problem hai me phele chal gya or navbar ki dikat ho gye 
        if (status === "notAuthenticated") {
            navigateTo(`/login`);
        }
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
          <Stack spacing={8} mx={"auto"} maxW={"lg"} mt={"10"} py={12} px={6}>
            <Stack align={"center"}>
              <Heading
                textAlign={"center"}
                fontWeight={500}
                fontFamily={"poppins"}
                fontSize={"3xl"}
              >
                Reset Password
              </Heading>
            </Stack>
            {status === "loading" ? (
              <Loader />
            ) : (
              <form onSubmit={formik.handleSubmit}>
                <VStack spacing={4} align='flex-start'>
                  <FormControl>
                    <FormLabel htmlFor='password'>New Password</FormLabel>
                    <Input
                      isRequired
                      id='password'
                      name='password'
                      type='text'
                      variant='filled'
                      onChange={formik.handleChange}
                      value={formik.values.password}
                    />
                  </FormControl>
                  <FormControl>
                    <FormLabel htmlFor='confirmPassword'>Confirm Password</FormLabel>
                    <Input
                      isRequired
                      id='confirmPassword'
                      name='confirmPassword'
                      type='text'
                      variant='filled'
                      onChange={formik.handleChange}
                      value={formik.values.confirmPassword}
                    />
                  </FormControl>
                  <Button type='submit' colorScheme='green' width='full'>
                    Reset Password
                  </Button>
                </VStack>
              </form>
            )}
          </Stack>
        </Flex>
      </>
    );
  };
  
  export default ResetPassword;
  