import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { newProductAdmin } from "../Redux/Product/productReducer";
import {
  Heading,
  FormControl,
  VStack,
  FormLabel,
  Input,
  Button,
  Box,
  Textarea,
  HStack,
  Grid,
  GridItem,
  Text,
  Menu,
  MenuButton,
  MenuList,
} from "@chakra-ui/react";
import { FaPencilAlt, FaUser } from "react-icons/fa";
import { ChevronDownIcon } from "@chakra-ui/icons";
import {
  MdDelete,
  MdOutlineDashboard,
  MdProductionQuantityLimits,
  MdOutlineRateReview,
} from "react-icons/md";
import { BsBorderStyle } from "react-icons/bs";
import { Link, useNavigate } from "react-router-dom";

const NewProduct = () => {
  const dispatch = useDispatch();
  const navigateTo = useNavigate();
  const [name, setname] = useState("");
  const [price, setprice] = useState(0);
  const [Description, setDescription] = useState("");
  const [Category, setCategory] = useState("");
  const [stock, setstock] = useState(0);
  const [image, setimages] = useState([]);
  const [imagesPreview, setimagesPreview] = useState([]);

  const categoryList = [
    "Laptop",
    "Footwear",
    "Bottom",
    "Tops",
    "Attire",
    "Camera",
    "SmartCamera",
  ];

  const createProductSumbitHandler = (e) => {
    e.preventDefault();
    const myForm = new FormData();
    myForm.set("name", name);
    myForm.set("price", price);
    myForm.set("description", Description);
    myForm.set("category", Category);
    myForm.set("Stock", stock);
    // console.log(image);
    // console.log(image.length);

    image.forEach((image) => {
      myForm.append("images", image);
    });
    dispatch(newProductAdmin(myForm));
  };

  const createProductImageChange = (e) => {
    const files = Array.from(e.target.files);

    files.forEach((file) => {
      const reader = new FileReader();

      reader.onload = () => {
        if (reader.readyState === 2) {
          setimagesPreview((old) => [...old, reader.result]);
          setimages((old) => [...old, reader.result]);
        }
      };

      reader.readAsDataURL(file);
    });
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
        <GridItem fontFamily={"poppins"} mb={"10"}>
          <Box w={"7xl"} m={"auto"} fontFamily={"poppins"} my={"5"}>
            <Heading fontFamily={"poppins"} textAlign={"center"} my={"5"}>Create Product</Heading>
            <form onSubmit={createProductSumbitHandler}>
              <VStack spacing={4} align='flex-start'>
                <FormControl>
                  <FormLabel htmlFor='name'>Product Name</FormLabel>
                  <Input
                    isRequired
                    id='name'
                    name='name'
                    type='text'
                    variant='filled'
                    onChange={(e) => {
                      setname(e.target.value);
                    }}
                    value={name}
                  />
                </FormControl>
                <FormControl>
                  <FormLabel htmlFor='price'>Price</FormLabel>
                  <Input
                    isRequired
                    id='price'
                    name='price'
                    type='number'
                    variant='filled'
                    onChange={(e) => {
                      setprice(e.target.value);
                    }}
                    value={price}
                  />
                </FormControl>
                <FormControl>
                  <FormLabel htmlFor='price'>Description</FormLabel>
                  <Textarea
                    isRequired
                    id='price'
                    name='price'
                    type='number'
                    variant='filled'
                    onChange={(e) => {
                      setDescription(e.target.value);
                    }}
                    value={Description}
                  />
                </FormControl>
                <FormControl>
                  <FormLabel htmlFor='price'>Select Category</FormLabel>
                  <select onChange={(e) => setCategory(e.target.value)}>
                    <option value={Category}>Category</option>
                    {categoryList.map((cate) => {
                      return (
                        <option key={cate} value={cate}>
                          {cate}
                        </option>
                      );
                    })}
                  </select>
                </FormControl>
                <FormControl>
                  <FormLabel htmlFor='stock'>Stock</FormLabel>
                  <Input
                    isRequired
                    id='stock'
                    name='stock'
                    type='number'
                    variant='filled'
                    onChange={(e) => {
                      setstock(e.target.value);
                    }}
                    value={stock}
                  />
                </FormControl>
                <Box>
                  <input
                    type='file'
                    name='avatar'
                    accept='image/*'
                    onChange={createProductImageChange}
                    multiple
                    isRequired
                  />
                </Box>
                <Box display={"flex"} flexWrap={"wrap"}>
                  {imagesPreview.map((image, index) => (
                    <img style={{alignSelf:"center",}} key={index} src={image} alt='Product Preview' />
                  ))}
                </Box>
                <Button type='submit' colorScheme='green' width='full'>
                  Create
                </Button>
              </VStack>
            </form>
          </Box>
        </GridItem>
      </Grid>
    </>
  );
};

export default NewProduct;
