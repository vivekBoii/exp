import { useEffect, useState } from "react";
import {
  Progress,
  Box,
  Button,
  Heading,
  Flex,
  Text,
  FormControl,
  FormLabel,
  Input,
  Select,
  Stack,
  Image,
  useColorModeValue as mode,
} from "@chakra-ui/react";
import { useFormik } from "formik";
import { Country, State } from "country-state-city";
import { useSelector, useDispatch } from "react-redux";
import { saveShippingInfo } from "../Redux/Cart/cartReducer";
import { FaArrowRight } from "react-icons/fa";
import { useNavigate } from "react-router-dom";


const Form2 = (props) => {
  const navigateTo = useNavigate();
  const user = useSelector((state) => state.user.user);
  const { cartItems, shippingInfo } = useSelector((state) => state.cart);
  const [total, setTotal] = useState(0);
  const address = `${shippingInfo.address}, ${shippingInfo.city}, ${shippingInfo.state}, ${shippingInfo.country}, ${shippingInfo.pinCode}`

  useEffect(() => {
    let calculatedTotal = 0;

    cartItems.forEach((item) => {
      calculatedTotal += item.price * item.quantity;
    });

    setTotal(calculatedTotal);
  }, [cartItems]);

  const paymentHandler = (e)=>{
    e.preventDefault();
    const data = {
      subtotal:total,
      shippingCharges:total> 1000 ? 1 : 200,
      tax:total*0.18,
      totalPrice:total*1.18+(total> 1000 ? 1 : 200),
    };
    console.log(data);
    sessionStorage.setItem("orderInfo", JSON.stringify(data));
    setTimeout(() => {
      navigateTo("/payment");
    }, 400);
  }
  return (
    <>
      <Heading
        w='100%'
        fontFamily={"poppins"}
        textAlign={"center"}
        fontWeight='normal'
        mb='2%'
      >
        Confirm Order
      </Heading>
      <Box>
        <Stack direction={"row"} w={"full"}>
          <Text fontWeight={"600"}>Name :</Text>
          <Text>{user.name}</Text>
        </Stack>
        <Stack mt={"1"} direction={"row"} w={"full"}>
          <Text fontWeight={"600"}>Phone No :</Text>
          <Text>{shippingInfo.phoneNo}</Text>
        </Stack>
        <Stack mt={"1"} direction={"row"} w={"full"}>
          <Text fontWeight={"600"}>Address:</Text>
          <Text>{address}</Text>
        </Stack>
        <Stack spacing={{ base: "8", md: "10" }} my={5} flex='2'>
          <Heading fontFamily={"poppins"} mt={"2%"} fontSize='2xl' fontWeight='500'>
            Shopping Cart ({cartItems.length} items)
          </Heading>

          <Stack spacing='6'>
            {cartItems.map((item) => (
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
              <OrderSummaryItem label='Subtotal' value={total} />
              <OrderSummaryItem label='Delivery' value={total> 1000 ? 1 : 200} />
              <OrderSummaryItem label='Tax' value={total * 0.18} />
              <Flex justify='space-between'>
                <Text fontSize='lg' fontWeight='semibold'>
                  Total
                </Text>
                <Text fontSize='xl' fontWeight='600'>
                  ₹{Math.round(total * 1.18 + (total> 1000 ? 1 : 200))}
                </Text>
              </Flex>
            </Stack>
            <Button
              colorScheme='green'
              size='lg'
              fontSize='md'
              onClick={paymentHandler}
              rightIcon={<FaArrowRight />}
            >
              Proceed to Payment
            </Button>
          </Stack>
        </Flex>
      </Box>
    </>
  );
};

const Form1 = (props) => {
  const { step, setStep } = props;
  const shippingInfo = useSelector((state) => state.cart.shippingInfo);
  const dispatch = useDispatch();
  const formik = useFormik({
    initialValues: {
      address: shippingInfo?.address || "",
      country: shippingInfo?.country || "",
      state: shippingInfo?.state || "",
      city: shippingInfo?.city || "",
      pinCode: shippingInfo?.pinCode || "",
      phoneNo: shippingInfo?.phoneNo || "",
    },
    onSubmit: (values) => {
      dispatch(saveShippingInfo(values));
      setStep(step + 1);
    },
  });
  return (
    <>
      <Heading w='100%' fontWeight={"500"} fontFamily={"poppins"} textAlign={"center"} mb='2%'>
        Shipping Details
      </Heading>
      <form onSubmit={formik.handleSubmit}>
        <FormControl>
          <FormLabel
            htmlFor='country'
            fontSize='sm'
            fontWeight='md'
            color='gray.700'
            _dark={{
              color: "gray.50",
            }}
          >
            Country / Region
          </FormLabel>
          <Select
            required
            id='country'
            name='country'
            autoComplete='country'
            placeholder='Select Country'
            focusBorderColor='brand.400'
            shadow='sm'
            size='sm'
            mt='2%'
            w='full'
            rounded='md'
            onChange={formik.handleChange}
            value={formik.values.country}
          >
            {Country.getAllCountries().map((item) => {
              return (
                <option key={item.isoCode} value={item.isoCode}>
                  {item.name}
                </option>
              );
            })}
          </Select>
        </FormControl>

        <FormControl>
          <FormLabel
            htmlFor='address'
            fontSize='sm'
            fontWeight='md'
            color='gray.700'
            _dark={{
              color: "gray.50",
            }}
            mt='2%'
            id='address'
            name='address'
          >
            Street address
          </FormLabel>
          <Input
            required
            type='text'
            name='address'
            id='address'
            autoComplete='address'
            focusBorderColor='brand.400'
            shadow='sm'
            size='sm'
            w='full'
            rounded='md'
            onChange={formik.handleChange}
            value={formik.values.address}
          />
        </FormControl>

        <FormControl>
          <FormLabel
            htmlFor='state'
            fontSize='sm'
            fontWeight='md'
            mt='2%'
            color='gray.700'
            _dark={{
              color: "gray.50",
            }}
          >
            State
          </FormLabel>
          <Select
            id='state'
            name='state'
            required
            autoComplete='off'
            placeholder='Select state'
            focusBorderColor='brand.400'
            shadow='sm'
            size='sm'
            w='full'
            rounded='md'
            onChange={formik.handleChange}
            value={formik.values.state}
          >
            {formik.values.country &&
              State.getStatesOfCountry(formik.values.country).map((item) => {
                return (
                  <option key={item.isoCode} value={item.isoCode}>
                    {item.name}
                  </option>
                );
              })}
          </Select>
        </FormControl>

        <FormControl>
          <FormLabel
            htmlFor='city'
            fontSize='sm'
            fontWeight='md'
            color='gray.700'
            _dark={{
              color: "gray.50",
            }}
            mt='2%'
          >
            City
          </FormLabel>
          <Input
            type='text'
            name='city'
            id='city'
            required
            autoComplete='city'
            focusBorderColor='brand.400'
            shadow='sm'
            size='sm'
            w='full'
            rounded='md'
            onChange={formik.handleChange}
            value={formik.values.city}
          />
        </FormControl>

        <FormControl>
          <FormLabel
            htmlFor='pinCode'
            fontSize='sm'
            fontWeight='md'
            color='gray.700'
            _dark={{
              color: "gray.50",
            }}
            mt='2%'
          >
            ZIP / Postal
          </FormLabel>
          <Input
            type='text'
            name='pinCode'
            id='pinCode'
            required
            autoComplete='postal-code'
            focusBorderColor='brand.400'
            shadow='sm'
            size='sm'
            w='full'
            rounded='md'
            onChange={formik.handleChange}
            value={formik.values.pinCode}
          />
        </FormControl>

        <FormControl>
          <FormLabel
            htmlFor='phoneNo'
            fontSize='sm'
            fontWeight='md'
            color='gray.700'
            _dark={{
              color: "gray.50",
            }}
            mt='2%'
          >
            Phone Number
          </FormLabel>
          <Input
            required
            type='text'
            name='phoneNo'
            id='phoneNo'
            focusBorderColor='brand.400'
            shadow='sm'
            size='sm'
            w='full'
            rounded='md'
            onChange={formik.handleChange}
            value={formik.values.phoneNo}
          />
        </FormControl>
        <Button my={8} type='submit' colorScheme='green' width='full'>
          Sumbit
        </Button>
      </form>
    </>
  );
};


export default function Shipping() {
  const [step, setStep] = useState(1);
  const [progress, setProgress] = useState(33.33);

  return (
    <>
      <Box
        borderWidth='1px'
        rounded='lg'
        shadow='1px 1px 2px rgba(0,0,0,0.3)'
        maxWidth={800}
        minH={"82vh"}
        p={6}
        m='10px auto'
        fontFamily={"poppins"}
      >
        <Progress
          colorScheme="green"
          value={progress*(step-1)}
          mb='5%'
          mx='5%'
          isAnimated
        ></Progress>
        {step === 1 ? (
          <Form1 step={step} setStep={setStep} />
        ) : step === 2 ? (
          <Form2 step={step} setStep={setStep} />
        ) : (null)}
      </Box>
    </>
  );
}

const CartItem = (props) => {
  const { name, quantity, images, price} = props;
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
