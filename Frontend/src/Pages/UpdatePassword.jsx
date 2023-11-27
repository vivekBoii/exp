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
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  updatePasswordRequest,
} from "../Redux/User/userReducer";

const UpdatePassword = () => {
  const dispatch = useDispatch();
  let navigateTo = useNavigate();
  const status = useSelector((state) => state.user.status);
  const user = useSelector((state) => state.user.user);
  const error = useSelector((state) => state.user.error);

  useEffect(() => {
  }, [status]);

  const formik = useFormik({
    initialValues: {
      oldPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
    onSubmit: async (values) => {
      dispatch(updatePasswordRequest(values));
      <AlertBox type={"success"} message={"Updated Successfully"} />;
      if (status === "authenticated") {
        navigateTo(`/account`);
      }
    },
  });

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
              Change Password
            </Heading>
          </Stack>
          {status === "loading" ? (
            <Loader />
          ) : (
            <form onSubmit={formik.handleSubmit}>
              <VStack spacing={4} align='flex-start'>
                <FormControl>
                  <FormLabel htmlFor='oldPassword'>Old Password</FormLabel>
                  <Input
                    isRequired
                    id='oldPassword'
                    name='oldPassword'
                    type='text'
                    variant='filled'
                    onChange={formik.handleChange}
                    value={formik.values.oldPassword}
                  />
                </FormControl>
                <FormControl>
                  <FormLabel htmlFor='newPassword'>New Password</FormLabel>
                  <Input
                    isRequired
                    id='newPassword'
                    name='newPassword'
                    type='text'
                    variant='filled'
                    onChange={formik.handleChange}
                    value={formik.values.newPassword}
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

export default UpdatePassword;
