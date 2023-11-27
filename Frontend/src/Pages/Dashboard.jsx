import React, { useEffect } from "react";
import {
  Box,
  Grid,
  GridItem,
  Heading,
  VStack,
  Text,
  Menu,
  MenuButton,
  MenuList,
  Button,
  HStack,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { ChevronDownIcon } from "@chakra-ui/icons";
import {
  MdOutlineDashboard,
  MdProductionQuantityLimits,
  MdOutlineRateReview,
} from "react-icons/md";
import { BsBorderStyle } from "react-icons/bs";
import { FaUser } from "react-icons/fa";
import { Doughnut, Line } from "react-chartjs-2";
import Chart from "chart.js/auto";
import { useDispatch, useSelector } from "react-redux";
import {
  ProductwithoutPage,
} from "../Redux/Product/productReducer";
import { getAllOrdersRequest } from "../Redux/Order/orderReducer";
import { getAllUsers } from "../Redux/User/userReducer";

const Dashboard = () => {
  const products = useSelector((state) => state.products.productItem);
  const dispatch = useDispatch();
  const order = useSelector((state) => state.order.allorders);
  const users = useSelector((state) => state.user.users);

  useEffect(() => {
    dispatch(ProductwithoutPage());
    dispatch(getAllOrdersRequest());
    dispatch(getAllUsers());
    console.log(products);
  }, []);

  let outOfStack = 0;

  products &&
    products.forEach((item) => {
      if (item.Stock <= 0) {
        outOfStack += 1;
      }
    });


  const lineState = {
    labels: ["initial Amount", "Amount Earned"],
    datasets: [
      {
        label: "TOTAL AMOUNT",
        backgroundColor: ["#4CAF50"],
        hoverBackgroundColor: ["#43A047"],
        data: [0,order.totalAmount],
      },
    ],
  };

  const doughnutScale = {
    labels: ["out of stock", "Instock"],
    datasets: [
      {
        backgroundColor: ["red", "#38A169"],
        hoverBackgroundColor: ["orange", "gray"],
        data: [outOfStack, products.length-outOfStack],
      },
    ],
  };

  return (
    <>
      <Grid w={"full"} templateColumns='1fr 5fr' fontFamily={"poppins"}>
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
        <GridItem fontFamily={"poppins"}>
          <VStack>
            <Heading mb={"5"} fontFamily={"poppins"}>
              Dashboard
            </Heading>
            <Text
              textAlign={"center"}
              p={"5"}
              bg={"green.500"}
              w={"full"}
              color={"white"}
              fontSize={"xl"}
              fontWeight={"600"}
            >
              {order && `Total Amount ₹${order.totalAmount}`}
            </Text>
            <HStack w={"full"} my={"5"}>
              <Text
                textAlign={"center"}
                p={"5"}
                bg={"green.500"}
                w={"full"}
                color={"white"}
                fontSize={"xl"}
                fontWeight={"600"}
                _hover={{
                  bg:"green.700"
                }}
              >
                <Link to={'/admin/productList'}>Product : {products && products.length}</Link>
              </Text>
              <Text
                textAlign={"center"}
                p={"5"}
                bg={"green.500"}
                w={"full"}
                color={"white"}
                fontSize={"xl"}
                fontWeight={"600"}
                _hover={{
                  bg:"green.700"
                }}
              >
                <Link to={"/admin/orders"}>Orders :{order.orders && order.orders.length}</Link>
              </Text>
              <Text
                textAlign={"center"}
                p={"5"}
                bg={"green.500"}
                w={"full"}
                color={"white"}
                fontSize={"xl"}
                fontWeight={"600"}
                _hover={{
                  bg:"green.700"
                }}
              >
                <Link to={"/admin/users"}>User : {users.users && users.users.length}</Link>
              </Text>
            </HStack>
            <HStack h={"xl"} w={"full"} gap={"10"}>
              <Box display={"flex"} alignItems={"center"} justifyContent={"center"} flex={"1"} w={"full"} h={"full"} className='lineChart'>
                <Line data={lineState} />
              </Box>
              <Box flex={"1"} h={"full"} className='doughnutScale'>
                <Doughnut data={doughnutScale} />
              </Box>
            </HStack>
          </VStack>
        </GridItem>
      </Grid>
    </>
  );
};

export default Dashboard;
