import {
  Box,
  HStack,
  Grid,
  GridItem,
  VStack,
  Text,
  Menu,
  MenuButton,
  MenuList,
  Button,
} from "@chakra-ui/react";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { adminProductListRequest } from "../Redux/Product/productReducer";
import { Link } from "react-router-dom";
import { FaPencilAlt, FaUser } from "react-icons/fa";
import { ChevronDownIcon } from "@chakra-ui/icons";
import {
  MdDelete,
  MdOutlineDashboard,
  MdProductionQuantityLimits,
  MdOutlineRateReview,
} from "react-icons/md";
import { BsBorderStyle } from "react-icons/bs";

const ReviewsAdmin = () => {
  const product = useSelector((state) => state.products.products);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(adminProductListRequest());
    console.log(product);
  }, []);

  return (
    <>
      <Grid
        w={"full"}
        minH={"84vh"}
        templateColumns='1fr 5fr'
        fontFamily={"poppins"}
      >
        <GridItem>
          <VStack fontWeight={"600"} my={"10"} fontSize={"xl"} gap={"10"}>
            <HStack w={"full"} px={"4"}>
              <Link>
                <MdOutlineDashboard />
              </Link>
              <Link to={"/admin/dashboard"}>DashBoard</Link>
            </HStack>
            <Menu>
              <MenuButton
                w={"full"}
                as={Button}
                bg={"white"}
                _hover={{ bg: "white" }}
                rightIcon={<ChevronDownIcon />}
              >
                <HStack>
                  <Link>
                    <MdProductionQuantityLimits />
                  </Link>
                  <Text fontSize={"xl"}>Products</Text>
                </HStack>
              </MenuButton>
              <MenuList display={"flex"} flexDirection={"column"} padding={"2"}>
                <Link to={"/admin/productList"}>All</Link>
                <Box w={"full"} border={"1px solid gray"}></Box>
                <Link to={"/admin/product/new"}>New</Link>
              </MenuList>
            </Menu>
            <HStack w={"full"} px={"4"}>
              <Link>
                <BsBorderStyle />
              </Link>
              <Link to={"/admin/orders"}>Orders</Link>
            </HStack>
            <HStack w={"full"} px={"4"}>
              <Link>
                <FaUser />
              </Link>
              <Link to={"/admin/users"}>Users</Link>
            </HStack>
            <HStack w={"full"} px={"4"}>
              <Link>
                <MdOutlineRateReview />
              </Link>
              <Link to={"/admin/reviews"}>Review</Link>
            </HStack>
          </VStack>
        </GridItem>
        <GridItem fontFamily={"poppins"} mb={"10"}>
          <Box w={"7xl"} m={"auto"} fontFamily={"poppins"}>
          <Text
              my={"10"}
              fontSize={"2xl"}
              fontWeight={"700"}
              textAlign={"center"}
            >
              Reviews
            </Text>
            <HStack>
              <Box fontWeight={"600"} flex={1.5}>Product ID</Box>
              <Box fontWeight={"600"} flex={1.5}>Name</Box>
              <Box fontWeight={"600"} flex={.8}>No of Reviews</Box>
              <Box fontWeight={"600"} flex={.8}>Ratings</Box>
            </HStack>
            {product &&
              product.products.map((item) => {
                return (
                  <Link to={`/admin/review/${item._id}`}>
                    <HStack key={item._id} my={"6"}>
                      <Box flex={1.5}>{item._id}</Box>
                      <Box flex={1.5}>{item.name}</Box>
                      <Box flex={.8}>{item.noOfReviews}</Box>
                      <Box flex={.8}>{item.ratings}</Box>
                    </HStack>
                  </Link>
                );
              })}
          </Box>
        </GridItem>
      </Grid>
    </>
  );
};

export default ReviewsAdmin;
