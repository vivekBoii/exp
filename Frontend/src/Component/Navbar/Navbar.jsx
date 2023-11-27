import React, { useEffect, useState } from "react";
import {
  Box,
  Flex,
  Avatar,
  HStack,
  IconButton,
  Button,
  Menu,
  InputLeftElement,
  MenuButton,
  InputGroup,
  Input,
  MenuList,
  MenuItem,
  Text,
  useDisclosure,
  useColorModeValue,
  Stack,
} from "@chakra-ui/react";
import { HamburgerIcon, CloseIcon, SearchIcon } from "@chakra-ui/icons";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import AlertBox from "../Alert/Alert";
import { logoutRequest } from "../../Redux/User/userReducer";

const Links = [
  "Home",
  "Products",
  "Contact",
  "About",
  "Login",
  "Signup",
  "Cart",
];

const NavLink = (props) => {
  const { children } = props;

  return (
    <Link px={2} py={1} rounded={"md"} to={children}>
      <Text
        color={"#003D29"}
        fontWeight={"500"}
        _hover={{
          color: "green",
        }}
      >
        {children}
      </Text>
    </Link>
  );
};

const Navbar = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [search, setsearch] = useState("");
  let navigateTo = useNavigate();
  const status = useSelector((state) => state.user.status);
  const user = useSelector((state) => state.user.user);
  const [logoutState, setLogoutState] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    // console.log(user)
  }, [search, status]);

  const handleSearchBar = (e) => {
    e.preventDefault();
    if (search.trim()) {
      navigateTo(`/products/${search}`);
    } else {
      navigateTo(`/products`);
    }
  };

  const handleLogout = (e) => {
    e.preventDefault();
    dispatch(logoutRequest());
    navigateTo(`/login`);
    if (status === "success") {
      setLogoutState(!logoutState);
      setTimeout(() => {
        setLogoutState(false);
      }, 5000);
    }
  };

  return (
    <>
      <Box px={4} fontFamily={"poppins"}>
        <Flex
          h={16}
          gap={2}
          alignItems={"center"}
          justifyContent={"space-between"}
        >
          <IconButton
            size={"md"}
            icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
            aria-label={"Open Menu"}
            display={{ md: "none" }}
            onClick={isOpen ? onClose : onOpen}
          />
          <HStack spacing={6} alignItems={"center"}>
            <Box color={"#003D29"} fontSize={"xl"} fontWeight={"600"}>
              <Link to={"/Home"}>EShop</Link>
            </Box>
            <HStack
              as={"nav"}
              spacing={4}
              display={{ base: "none", md: "flex" }}
            >
              {Links.map((link) =>
                status === "authenticated" ? (
                  link !== "Login" && link !== "Signup" ? (
                    <NavLink key={link} link={link}>
                      {link}
                    </NavLink>
                  ) : null
                ) : (
                  <NavLink key={link} link={link}>
                    {link}
                  </NavLink>
                )
              )}
            </HStack>
          </HStack>
          <Flex alignItems={"center"} gap={"10"}>
            <Box
              display={{
                base: "none",
                md: "block",
              }}
            >
              <form style={{ display: "flex" }}>
                <InputGroup
                  display={{
                    base: "none",
                    md: "block",
                  }}
                  w={40}
                >
                  <InputLeftElement pointerEvents='none'>
                    <SearchIcon />
                  </InputLeftElement>
                  <Input
                    border='1px solid'
                    outline={"0"}
                    borderRadius={"0px 0px 0px 0px"}
                    type='tel'
                    placeholder='Search...'
                    _focus={{
                      outline: "0",
                    }}
                    value={search}
                    onChange={(e) => {
                      setsearch(e.target.value);
                    }}
                  />
                </InputGroup>

                <Button
                  color={"#fff"}
                  type='submit'
                  colorScheme='green'
                  borderRadius={"0px 0px 0px 0px"}
                  display={{
                    base: "none",
                    md: "block",
                  }}
                  onClick={handleSearchBar}
                >
                  Submit
                </Button>
              </form>
            </Box>
            {status === "authenticated" && (
              <Menu>
                <MenuButton
                  as={Button}
                  rounded={"full"}
                  variant={"link"}
                  cursor={"pointer"}
                  minW={0}
                >
                  {user.avatar && (
                    <Avatar
                      // size={"10"}
                      w={"10"}
                      h={"10"}
                      src={user.avatar.url}
                    />
                  )}
                </MenuButton>
                <MenuList>
                  {user.role === "admin" && (
                    <MenuItem
                      onClick={() => {
                        navigateTo("/admin/dashboard");
                      }}
                    >
                      Dashborad
                    </MenuItem>
                  )}
                  <MenuItem
                    onClick={() => {
                      navigateTo("/cart");
                    }}
                  >
                    Cart
                  </MenuItem>
                  <MenuItem
                    onClick={() => {
                      navigateTo("/account");
                    }}
                  >
                    Account
                  </MenuItem>
                  <MenuItem onClick={handleLogout}>logout</MenuItem>
                </MenuList>
              </Menu>
            )}
          </Flex>
        </Flex>
        {isOpen ? (
          <Box pb={4} display={{ md: "none" }}>
            <Stack
              as={"nav"}
              direction={"row"}
              wrap={"wrap"}
              spacing={4}
              justify={"center"}
            >
              {Links.map((link) =>
                status === "authenticated" ? (
                  link !== "Login" && link !== "Signup" ? (
                    <NavLink key={link} link={link}>
                      {link}
                    </NavLink>
                  ) : null
                ) : (
                  <NavLink key={link} link={link}>
                    {link}
                  </NavLink>
                )
              )}
            </Stack>
            <form
              style={{
                display: "flex",
                margin: "20px auto 20px auto",
                justifyContent: "center",
              }}
            >
              <InputGroup
                display={{
                  base: "block",
                  md: "none",
                }}
                w={44}
              >
                <InputLeftElement pointerEvents='none'>
                  <SearchIcon />
                </InputLeftElement>
                <Input
                  border='1px solid'
                  borderRadius={"0px 0px 0px 0px"}
                  type='tel'
                  placeholder='Search...'
                />
              </InputGroup>

              <Button
                colorScheme='teal'
                type='submit'
                borderRadius={"0px 0px 0px 0px"}
                display={{
                  base: "block",
                  md: "none",
                }}
              >
                Submit
              </Button>
            </form>
          </Box>
        ) : null}
      </Box>
      {logoutState && (
        <AlertBox type={"success"} message={"logout Successfully"} />
      )}
    </>
  );
};

export default Navbar;
