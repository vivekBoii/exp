import React, { useEffect ,useState} from "react";
import { useSelector, useDispatch } from "react-redux";
import { OrderDetailsRequest } from "../Redux/Order/orderReducer";
import { useParams } from "react-router-dom";
import { Box, HStack, Heading, Stack, Text , Flex,Image } from "@chakra-ui/react";

const OrderDetails = () => {
  const dispatch = useDispatch();
  const orderDetails = useSelector((state) => state.order.orderDetails.order);
  const { id } = useParams();

  useEffect(() => {
    dispatch(OrderDetailsRequest(id));
  }, []);

  return (
    <>
      {orderDetails && (
        <>
          <Box w={"7xl"} m={"auto"} fontFamily={"poppins"}>
            <Heading color={"#003D29"} fontWeight={"600"} my={"10"} fontFamily={"poppins"}>#{orderDetails._id} 🛒 </Heading>
            <Box>
              <Heading color={"#003D29"} fontWeight={"600"} my={"5"} fontFamily={"poppins"}>Shipping Info</Heading>
              <HStack my={"1"}>
                <Text fontWeight={"600"}>Name:</Text>
                <Text>{orderDetails.user.name}</Text>
              </HStack>
              <HStack my={"1"}>
                <Text fontWeight={"600"}>Phone:</Text>
                <Text>{orderDetails.shippingInfo.phoneNo}</Text>
              </HStack>
              <HStack my={"1"}>
                <Text fontWeight={"600"}>Address:</Text>
                <Text>{`${orderDetails.shippingInfo.address} , ${orderDetails.shippingInfo.city} , ${orderDetails.shippingInfo.state} ,${orderDetails.shippingInfo.country} , ${orderDetails.shippingInfo.pinCode}`}</Text>
              </HStack>
            </Box>
            <Box>
              <Heading color={"#003D29"} fontWeight={"600"} my={"5"} fontFamily={"poppins"}>Payment</Heading>
              <HStack my={"1"}>
                <Text fontWeight={"600"}>{orderDetails.paymentInfo.status}</Text>
              </HStack>
              <HStack my={"1"}>
                <Text fontWeight={"600"}>Amount:</Text>
                <Text>{orderDetails.totalPrice}</Text>
              </HStack>
            </Box>
            <Box>
              <Heading color={"#003D29"} fontWeight={"600"} my={"5"} fontFamily={"poppins"}>Order Status</Heading>
              <Text fontWeight={"600"}>{orderDetails.orderStatus}</Text>
            </Box>
            <Box mb={"10"}>
              <Heading color={"#003D29"} fontWeight={"600"} my={"10"} fontFamily={"poppins"}>Order items :</Heading>
              <Stack spacing='6'>
                {orderDetails.orderItems.map((item) => (
                  <CartItem key={item._id} {...item} />
                ))}
              </Stack>
            </Box>
          </Box>
        </>
      )}
    </>
  );
};

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

export default OrderDetails;
