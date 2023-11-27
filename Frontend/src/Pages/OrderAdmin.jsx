import React from "react";
import { useEffect, useState } from "react";
import {
  Button,
  Heading,
  Flex,
  Text,
  FormControl,
  FormLabel,
  Stack,
  Box,
  HStack,
  Grid,
  GridItem,
  VStack,
  Menu,
  MenuButton,
  MenuList,
  Image,
  useColorModeValue as mode,
} from "@chakra-ui/react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useParams, Link } from "react-router-dom";
import {
  OrderDetailsRequest,
  UpdateOrderRequest,
} from "../Redux/Order/orderReducer";
import { FaUser } from "react-icons/fa";
import { ChevronDownIcon } from "@chakra-ui/icons";
import {
  MdOutlineDashboard,
  MdProductionQuantityLimits,
  MdOutlineRateReview,
} from "react-icons/md";
import { BsBorderStyle } from "react-icons/bs";

const OrderAdmin = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const order = useSelector((state) => state.order.orderDetails.order);
  const [status, setStatus] = useState("");

  useEffect(() => {
    dispatch(OrderDetailsRequest(id));
  }, []);

  const processOrder = (e) => {
    e.preventDefault();
    const myForm = new FormData();
    myForm.set("status", status);
    dispatch(UpdateOrderRequest({ id, myForm }));
    dispatch(OrderDetailsRequest(id));
  };
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
        <GridItem fontFamily={"poppins"} my={"10"}>
          <Box w={"7xl"} m={"auto"} fontFamily={"poppins"}>
            <Heading
              w='100%'
              fontFamily={"poppins"}
              textAlign={"center"}
              fontWeight='600'
              mb='2%'
            >
              Update Status
            </Heading>
            <Box>
              <Stack direction={"row"} w={"full"}>
                <Text fontWeight={"600"}>Name :</Text>

                <Text>{order && order.user.name}</Text>
              </Stack>
              <Stack mt={"1"} direction={"row"} w={"full"}>
                <Text fontWeight={"600"}>Phone No :</Text>
                <Text>{order && order.shippingInfo.phoneNo}</Text>
              </Stack>
              <Stack mt={"1"} direction={"row"} w={"full"}>
                <Text fontWeight={"600"}>Address:</Text>
                <Text>{`${order && order.shippingInfo.address}, ${
                  order && order.shippingInfo.city
                }, ${order && order.shippingInfo.state}, ${
                  order && order.shippingInfo.country
                }, ${order && order.shippingInfo.pinCode}`}</Text>
              </Stack>
              <Heading
                fontFamily={"poppins"}
                mt={"2%"}
                fontSize='2xl'
                fontWeight='500'
              >
                Order status :
              </Heading>
              <Text my={"2"}>{order && order.orderStatus}</Text>
              <Stack spacing={{ base: "8", md: "10" }} my={5} flex='2'>
                <Heading
                  fontFamily={"poppins"}
                  mt={"2%"}
                  fontSize='2xl'
                  fontWeight='500'
                >
                  Shopping Cart ({order && order.orderItems.length} items)
                </Heading>

                <Stack spacing='6'>
                  {order &&
                    order.orderItems.map((item) => (
                      <CartItem key={item.product} {...item} />
                    ))}
                </Stack>
              </Stack>
              <Flex direction='column' align='center' flex='1'>
                <Stack
                  spacing='8'
                  borderWidth='1px'
                  rounded='lg'
                  padding='8'
                  width='full'
                >
                  <Heading fontFamily={"poppins"} size='md'>Order Summary</Heading>

                  <Stack spacing='6'>
                    <OrderSummaryItem
                      label='Subtotal'
                      value={
                        order && order.totalPrice - order && order.taxPrice
                      }
                    />
                    <OrderSummaryItem
                      label='Delivery'
                      value={
                        order &&
                        order.totalPrice - order &&
                        order.taxPrice > 1000
                          ? 1
                          : 200
                      }
                    />
                    <OrderSummaryItem
                      label='Tax'
                      value={order && order.taxPrice}
                    />
                    <Flex justify='space-between'>
                      <Text fontSize='lg' fontWeight='semibold'>
                        Total
                      </Text>
                      <Text fontSize='xl' fontWeight='600'>
                        ₹{order && order.totalPrice}
                      </Text>
                    </Flex>
                  </Stack>
                  <Box>
                    <Heading fontFamily={"poppins"} mb={"4"}>Update Status</Heading>
                    <form onSubmit={processOrder}>
                      <VStack spacing={4} align='flex-start'>
                        <FormControl>
                          <FormLabel htmlFor='price'>Select Category</FormLabel>
                          <select
                            value={status}
                            onChange={(e) => setStatus(e.target.value)}
                          >
                            <option value={""}>Choose Category</option>
                            <option value={"shipped"}>Shipped</option>
                            <option value={"delivered"}>Delivered</option>
                          </select>
                        </FormControl>
                        {/* work */}
                        <Button type='submit' colorScheme='green' width='full'>
                          Update Status
                        </Button>
                      </VStack>
                    </form>
                  </Box>
                </Stack>
              </Flex>
            </Box>
          </Box>
        </GridItem>
      </Grid>
    </>
  );
};

export default OrderAdmin;

const CartItem = (props) => {
  const { name, quantity, images, price } = props;
  const [quant, setQuant] = useState(quantity);

  return (
    <Flex
      direction={{ base: "column", md: "row" }}
      justify='space-between'
      align='center'
    >
      <Stack direction='row' spacing='5' width='full' alignItems={"center"}>
        <Image
          rounded='lg'
          width='120px'
          height='120px'
          fit='contain'
          src={images}
          alt={name}
          draggable='false'
          loading='lazy'
        />
        <Box>
          <Text fontWeight='medium'>{name}</Text>
        </Box>
      </Stack>

      {/* Desktop */}
      <Flex width='full' justify='end' display={{ base: "none", md: "flex" }}>
        {`₹${price} * ₹${quant} = ₹${price * quant}`}
      </Flex>

      {/* Mobile */}
      <Flex
        mt='4'
        align='center'
        width='full'
        justify='space-between'
        display={{ base: "flex", md: "none" }}
      ></Flex>
    </Flex>
  );
};

const OrderSummaryItem = (props) => {
  const { label, value, children } = props;
  return (
    <Flex justify='space-between' fontSize='sm'>
      <Text fontWeight='medium' color={mode("gray.600", "gray.400")}>
        {label}
      </Text>
      {value ? <Text fontWeight='medium'>₹{value}</Text> : children}
    </Flex>
  );
};
