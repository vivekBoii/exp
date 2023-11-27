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
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { forgotPasswordRequest } from "../Redux/User/userReducer";

const ForgotPassword = () => {
  const dispatch = useDispatch();
  let navigateTo = useNavigate();
  const status = useSelector((state) => state.user.status);

  useEffect(() => {
    if (status === "authenticated") {
        navigateTo(`/account`);
      }
  }, [status]);

  const formik = useFormik({
    initialValues: {
      email: "",
    },
    onSubmit: async (values) => {
      dispatch(forgotPasswordRequest(values));
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
              Forgot Password
            </Heading>
          </Stack>

          <form onSubmit={formik.handleSubmit}>
            <VStack spacing={4} align='flex-start'>
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

              <Button type='submit' colorScheme='green' width='full'>
                Send Email
              </Button>
            </VStack>
          </form>
        </Stack>
      </Flex>
    </>
  );
};

export default ForgotPassword;
