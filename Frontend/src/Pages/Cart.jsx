import {
  Box,
  Flex,
  Heading,
  HStack,
  Stack,
  CloseButton,
  Button,
  Input,
  Image,
  Text,
  useColorModeValue as mode,
} from "@chakra-ui/react";
import { useState , useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addToCartRequest,
  removeProductFromCart,
} from "../Redux/Cart/cartReducer";
import { FaArrowRight } from "react-icons/fa";
import { useNavigate , Link } from "react-router-dom";


export const Cart = () => {
  const cartData = useSelector((state) => state.cart.cartItems);
  const [total, setTotal] = useState(0);
  let navigateTo = useNavigate();

  useEffect(() => {
    let calculatedTotal = 0;

    cartData.forEach((item) => {
      calculatedTotal += item.price * item.quantity;
    });

    setTotal(calculatedTotal);
  }, [cartData]);

  const handleCheckout = () =>{
    navigateTo("/login?redirect=shipping")
  }

  return (
    <Box
      maxW={{ base: "3xl", lg: "7xl" }}
      mx='auto'
      px={{ base: "4", md: "8", lg: "12" }}
      py={{ base: "6", md: "8", lg: "12" }}
      minH={"85vh"}
    >
      <Stack
        direction={{ base: "column", lg: "row" }}
        align={{ lg: "flex-start" }}
        spacing={{ base: "8", md: "16" }}
      >
        <Stack spacing={{ base: "8", md: "10" }} flex='2'>
          <Heading fontSize='2xl' fontWeight={"600"} color={"#003D29"} fontFamily={"poppins"}>
            Shopping Cart ({cartData.length} items)
          </Heading>

          <Stack spacing='6'>
            {cartData.map((item) => (
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
            <Heading size='md'>Order Summary</Heading>

            <Stack spacing='6'>
              <OrderSummaryItem label='Subtotal' value={total} />
              <OrderSummaryItem label='Delivery' value={total>1000?1:200} />
              <OrderSummaryItem label='Shipping + Tax' value={Math.round(total * 0.15)} />
              <Flex justify='space-between'>
                <Text fontSize='lg' fontWeight='semibold'>
                  Total
                </Text>
                <Text fontSize='xl' fontWeight='extrabold'>
                  ₹{Math.round(total * 1.18) + 1}
                </Text>
              </Flex>
            </Stack>
            <Button
              colorScheme='green'
              size='lg'
              fontSize='md'
              rightIcon={<FaArrowRight />}
              onClick={handleCheckout}
            >
              Checkout
            </Button>
          </Stack>
          <HStack mt='6' fontWeight='semibold'>
            <p>or</p>
            <Link to={"/Products"} color={'green'}>Continue shopping</Link>
          </HStack>
        </Flex>
      </Stack>
    </Box>
  );
};

const CartItem = (props) => {
  const { name, quantity, images, price, stock, product } = props;
  const dispatch = useDispatch();
  const [quant, setQuant] = useState(quantity);

  return (
    <Flex
      direction={{ base: "column", md: "row" }}
      justify='space-between'
      align='center'
    >
      <CartProductMeta name={name} images={images} />

      {/* Desktop */}
      <Flex 
        width='full'
        justify='space-between'
        display={{ base: "none", md: "flex" }}
      >
        <HStack>
          <Button
            rounded={"4"}
            w={"10"}
            size={"sm"}
            py={0}
            px={0}
            colorScheme="green"
            textTransform={"uppercase"}
            _hover={{
              transform: "translateY(2px)",
              boxShadow: "lg",
            }}
            onClick={(e) => {
              e.preventDefault();
              if (quant > 1) {
                setQuant(quant - 1);
              }
              dispatch(addToCartRequest({ id: product, quantity: quant }));
            }}
          >
            -
          </Button>
          <Input
            textAlign={"center"}
            w={"10"}
            size={"sm"}
            py={0}
            px={0}
            variant='outline'
            htmlSize={4}
            value={quant}
            readOnly
            placeholder=''
            type='number'
            bg={mode("gray.200", "gray.50")}
          />
          <Button
            rounded={"4"}
            w={"10"}
            size={"sm"}
            py={0}
            px={0}
            colorScheme="green"
            textTransform={"uppercase"}
            _hover={{
              transform: "translateY(2px)",
              boxShadow: "lg",
            }}
            onClick={(e) => {
              e.preventDefault();
              if (quant < stock) {
                setQuant(quantity + 1);
              }
              dispatch(addToCartRequest({ id: product, quantity: quant }));
            }}
          >
            +
          </Button>
        </HStack>
        ₹{price * quant}
        <CloseButton
          aria-label={`Delete ${name} from cart`}
          onClick={(e) => {
            e.preventDefault();
            dispatch(removeProductFromCart(product));
          }}
        />
      </Flex>

      {/* Mobile */}
      <Flex
        mt='4'
        align='center'
        width='full'
        justify='space-between'
        display={{ base: "flex", md: "none" }}
      >
        <Link
          onClick={() => {
            dispatch(removeProductFromCart(product));
          }}
          fontSize='sm'
          textDecor='underline'
        >
          Delete
        </Link>
        <HStack>
          <Button
            rounded={"none"}
            w={"10"}
            size={"sm"}
            py={0}
            px={0}
            bg={mode("gray.900", "gray.50")}
            color={mode("white", "gray.900")}
            textTransform={"uppercase"}
            _hover={{
              transform: "translateY(2px)",
              boxShadow: "lg",
            }}
            onClick={(e) => {
              e.preventDefault();
              if (quant > 1) {
                setQuant(quant - 1);
              }
            }}
          >
            -
          </Button>
          <Input
            textAlign={"center"}
            w={"10"}
            size={"sm"}
            py={0}
            px={0}
            variant='outline'
            htmlSize={4}
            value={quant}
            readOnly
            placeholder=''
            type='number'
            bg={mode("gray.200", "gray.50")}
          />
          <Button
            rounded={"none"}
            w={"10"}
            size={"sm"}
            py={0}
            px={0}
            bg={mode("gray.900", "gray.50")}
            color={mode("white", "gray.900")}
            textTransform={"uppercase"}
            _hover={{
              transform: "translateY(2px)",
              boxShadow: "lg",
            }}
            onClick={(e) => {
              e.preventDefault();
              if (quant < stock) {
                setQuant(quant + 1);
              }
            }}
          >
            +
          </Button>
        </HStack>
      </Flex>
    </Flex>
  );
};

const CartProductMeta = (props) => {
  const { images, name } = props;
  return (
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
