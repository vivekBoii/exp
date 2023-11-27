import { useEffect, useRef, useState } from "react";
import { Progress, Box, Heading, Text } from "@chakra-ui/react";
import { useSelector, useDispatch } from "react-redux";
import {
  CardNumberElement,
  CardCvcElement,
  CardExpiryElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import axios from "axios";
import { FaRegCreditCard, FaKey } from "react-icons/fa";
import { MdEvent } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { createOrderRequest } from "../Redux/Order/orderReducer";

const Form3 = () => {
  const orderInfo = JSON.parse(sessionStorage.getItem("orderInfo"));
  const navigateTo = useNavigate();
  const payBtn = useRef(null);
  const stripe = useStripe();
  const elements = useElements();
  const dispatch = useDispatch();
  const { cartItems, shippingInfo } = useSelector((state) => state.cart);
  const user = useSelector((state) => state.user.user);

  const paymentData = {
    amount: Math.round(orderInfo.totalPrice * 100),
  };

  const order = {
    shippingInfo,
    orderItems: cartItems,
    itemsPrice: orderInfo.subtotal,
    taxPrice: orderInfo.tax,
    shippingPrice: orderInfo.shippingCharges,
    totalPrice: orderInfo.totalPrice,
  };

  const sumbitHandler = async (e) => {
    e.preventDefault();
    payBtn.current.disabled = true;
    try {
      const config = {
        headers: {
          "content-Type": "application/json",
        },
        withCredentials: true,
      };
      const { data } = await axios.post(
        "http://localhost:4000/api/v1/payment/process",
        paymentData,
        config
      );
      console.log(data);

      const client_secret = data.client_secret;

      if (!stripe || !elements) {
        return;
      }

      const result = await stripe.confirmCardPayment(client_secret, {
        payment_method: {
          card: elements.getElement(CardNumberElement),
          billing_details: {
            name: user.name,
            email: user.email,
            address: {
              line1: shippingInfo.address,
              city: shippingInfo.city,
              state: shippingInfo.state,
              postal_code: shippingInfo.pinCode,
              country: shippingInfo.country,
            },
          },
        },
      });

      if (result.error) {
        payBtn.current.disabled = false;
        alert(result.error.message);
      } else {
        if (result.paymentIntent.status === "succeeded") {
          order.paymentInfo = {
            id: result.paymentIntent.id,
            status: result.paymentIntent.status,
          };

          dispatch(createOrderRequest(order));
          navigateTo("/success");
        } else {
          alert("there is error while processing this issue");
        }
      }
    } catch (error) {
      payBtn.current.disabled = false;
      console.log(error);
      alert(error.response.data.message);
    }
  };
  return (
    <>
      <Heading w='100%' fontFamily={"poppins"} textAlign={"center"} fontWeight='normal'>
        Payment
      </Heading>
      <Box>
        <form
          className='paymentForm'
          onSubmit={(e) => {
            sumbitHandler(e);
          }}
        >
          <Text>Card Info</Text>
          <Box>
            <FaRegCreditCard />
            <CardNumberElement className='paymentInput' />
          </Box>
          <Box>
            <MdEvent />
            <CardExpiryElement className='paymentInput' />
          </Box>
          <Box>
            <FaKey />
            <CardCvcElement className='paymentInput' />
          </Box>
          <input
            type='submit'
            value={`pay - ₹${orderInfo && Math.round(orderInfo.totalPrice)}`}
            ref={payBtn}
            className='paymentFormBtn'
          />
        </form>
      </Box>
    </>
  );
};

export default function Payment() {
  const [progress, setProgress] = useState(33.33);

  return (
    <>
      <Box
        borderWidth='1px'
        rounded='lg'
        shadow='1px 1px 3px rgba(0,0,0,0.3)'
        maxWidth={800}
        minH={"82vh"}
        p={6}
        m='10px auto'
      >
        <Progress
          colorScheme='green'
          value={progress * 2}
          mb='5%'
          mx='5%'
          isAnimated
        ></Progress>
        <Form3 />
      </Box>
    </>
  );
}
