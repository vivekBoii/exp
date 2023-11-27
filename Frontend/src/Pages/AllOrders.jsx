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
import {
  DeleteOrderRequest,
  getAllOrdersRequest,
} from "../Redux/Order/orderReducer";
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

const AllOrders = () => {
  const allorders = useSelector((state) => state.order.allorders);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllOrdersRequest());
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
              Order Status
            </Text>
            <HStack mb={"5"}>
              <Box fontWeight={"600"} flex={1.5}>
                Product ID
              </Box>
              <Box fontWeight={"600"} flex={1}>
                Status
              </Box>
              <Box fontWeight={"600"} flex={1}>
                ItemQty.
              </Box>
              <Box fontWeight={"600"} flex={1}>
                Price
              </Box>
              <Box fontWeight={"600"} flex={1}>
                Actions
              </Box>
            </HStack>
            {allorders.orders &&
              allorders.orders.map((item) => {
                return (
                  <HStack key={item._id} mb={"5"}>
                    <Box flex={1.5}>{item._id}</Box>
                    <Box flex={1}>{item.orderStatus}</Box>
                    <Box flex={1}>{item.orderItems.length}</Box>
                    <Box flex={1}>₹{item.totalPrice}</Box>
                    <HStack flex={1} gap={"10"}>
                      <Link to={`/admin/order/${item._id}`}>
                        <FaPencilAlt />
                      </Link>
                      <Button
                        onClick={() => {
                          dispatch(DeleteOrderRequest(item._id));
                          setTimeout(() => {
                            dispatch(getAllOrdersRequest());
                          }, 200);
                        }}
                      >
                        <MdDelete />
                      </Button>
                    </HStack>
                  </HStack>
                );
              })}
          </Box>
        </GridItem>
      </Grid>
    </>
  );
};

export default AllOrders;
