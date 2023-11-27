import { Flex, Grid, GridItem, Text } from '@chakra-ui/react';
import * as React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from 'react';
import { myOrderRequest } from '../Redux/Order/orderReducer';
import {Link} from "react-router-dom";
import { FaExternalLinkAlt } from "react-icons/fa";


const Myorders = () => {
  useEffect(() => {
    dispatch(myOrderRequest());
  }, [])
  const dispatch = useDispatch();
  const user = useSelector(state=>state.user.user);
  const orders= useSelector(state=>state.order.myOrders);
  
  return (
    <>
        <Flex fontFamily={"poppins"} maxW={"7xl"} direction={"column"} m={"auto"} minH={"84vh"}>
          <Text my={"10"} fontSize={"2xl"} fontWeight={"700"} textAlign={"center"}>{user.name}'s table</Text>
          <Grid templateColumns={"repeat(4,1fr) .1fr"} gap={6} textAlign={"center"}>
            <GridItem fontWeight={"600"}>Order Id</GridItem>
            <GridItem fontWeight={"600"}>Status</GridItem>
            <GridItem fontWeight={"600"}>Items Quantity</GridItem>
            <GridItem fontWeight={"600"}>Amount</GridItem>
            <GridItem fontWeight={"600"}>Actions</GridItem>
            {
              orders && orders.orders && orders.orders.map((order)=>{
                return(
                  <>
                    <GridItem>{order._id}</GridItem>
                    <GridItem sx={{color:order.orderStatus!=="Processing"?"green":"red"}}>{order.orderStatus}</GridItem>
                    <GridItem>{order.orderItems.length}</GridItem>
                    <GridItem>₹{order.totalPrice}</GridItem>
                    <GridItem margin={"auto"}><Link to={`${order._id}`}><FaExternalLinkAlt /></Link></GridItem>
                  </>
                )
              })
            }
          </Grid>
        </Flex>
    </>
  )
}

export default Myorders;
