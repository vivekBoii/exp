import React, { useEffect, useState } from "react";
import {
  IconButton,
  useBreakpointValue,
  Box,
  Input,
  Container,
  Stack,
  Text,
  Image,
  Flex,
  VStack,
  Button,
  Heading,
  SimpleGrid,
  FormControl,
  FormLabel,
  InputGroup,
  InputLeftElement,
  StackDivider,
  useColorModeValue,
  List,
  Link,
  Textarea,
  Center,
  Avatar,
  ListItem,
  HStack,
} from "@chakra-ui/react";
import { BiLeftArrowAlt, BiRightArrowAlt } from "react-icons/bi";
import Slider from "react-slick";
import { useSelector, useDispatch } from "react-redux";
import Loader from "../Component/Spinner/Spinner";
import AlertBox from "../Component/Alert/Alert";
import {
  fetchProductDetails,
  newReviewRequest,
} from "../Redux/Product/productReducer";
import { useParams } from "react-router-dom";
import Metadata from "../Component/Metadata";
import ReactStars from "react-rating-stars-component";
import AvtarImg from "../assets/Avatar.jpg";
import { addToCartRequest } from "../Redux/Cart/cartReducer";
import { BsGithub, BsDiscord, BsPerson } from "react-icons/bs";
import {
  MdPhone,
  MdEmail,
  MdLocationOn,
  MdFacebook,
  MdOutlineEmail,
} from "react-icons/md";

// slider settings
const settings = {
  dots: true,
  arrows: false,
  fade: true,
  infinite: true,
  autoplay: true,
  speed: 500,
  autoplaySpeed: 5000,
  slidesToShow: 1,
  slidesToScroll: 1,
};

const ProductDetails = () => {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products);
  const productDetails = useSelector((state) => state.products.productDetails);
  const [quantity, setQuantity] = useState(1);
  const [comment, setcomment] = useState("");
  const [rating, setrating] = useState(0);
  const { id } = useParams();

  useEffect(() => {
    dispatch(fetchProductDetails(id));
  }, [dispatch]);

  const handleReviewSumbit = (e) => {
    e.preventDefault();
    const myForm = new FormData();
    myForm.set("rating", rating);
    myForm.set("comment", comment);
    myForm.set("productId", id);
    console.log(myForm);
    dispatch(newReviewRequest(myForm));
    setTimeout(() => {
      dispatch(fetchProductDetails(id));
    }, 100);
  };

  // ----carousel-----
  const [slider, setSlider] = useState();

  // breakpoints for buttons
  const top = useBreakpointValue({ base: "90%", md: "50%" });
  const side = useBreakpointValue({ base: "30%", md: "10px" });

  return (
    <>
      <Metadata title={"Ecommerce - Product"} />
      {products.status === "loading" ? (
        <Loader />
      ) : products.status === "success" ? (
        <>
          <Container maxW={"7xl"} fontFamily={"'Poppins', sans-serif"}>
            <SimpleGrid
              columns={{ base: 1, lg: 2 }}
              spacing={{ base: 8, md: 10 }}
              py={{ base: 18, md: 24 }}
            >
              <Flex>
                {/* -----carousel------ */}
                <Box
                  position={"relative"}
                  height={"600px"}
                  width={"full"}
                  overflow={"hidden"}
                >
                  {/* CSS files for react-slick */}
                  <link
                    rel='stylesheet'
                    type='text/css'
                    href='https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick.min.css'
                  />
                  <link
                    rel='stylesheet'
                    type='text/css'
                    href='https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick-theme.min.css'
                  />
                  {/* Left Icon */}
                  <IconButton
                    aria-label='left-arrow'
                    colorScheme='green'
                    borderRadius='full'
                    position='absolute'
                    left={side}
                    top={top}
                    transform={"translate(0%, -50%)"}
                    zIndex={2}
                    onClick={() => slider?.slickPrev()}
                  >
                    <BiLeftArrowAlt />
                  </IconButton>
                  {/* Right Icon */}
                  <IconButton
                    aria-label='right-arrow'
                    colorScheme='green'
                    borderRadius='full'
                    position='absolute'
                    right={side}
                    top={top}
                    transform={"translate(0%, -50%)"}
                    zIndex={2}
                    onClick={() => slider?.slickNext()}
                  >
                    <BiRightArrowAlt />
                  </IconButton>
                  {/* Slider */}
                  <Slider {...settings} ref={(slider) => setSlider(slider)}>
                    {productDetails &&
                      productDetails.images &&
                      productDetails.images.map((img, index) => (
                        <Box
                          key={index}
                          height={"xl"}
                          position='relative'
                          backgroundPosition='center'
                          backgroundSize={"contain"}
                          backgroundRepeat='no-repeat'
                          backgroundImage={`url(${img.url})`}
                        />
                      ))}
                  </Slider>
                </Box>
                {/* ----------- */}
              </Flex>
              <Stack >
                <Box as={"header"}>
                  <Heading
                    lineHeight={1.1}
                    fontWeight={600}
                    color={"#003D29"}
                    fontSize={{ base: "2xl", sm: "4xl", lg: "5xl" }}
                    fontFamily={"'Poppins', sans-serif"}
                  >
                    {productDetails.name}
                  </Heading>
                  <Text color={"#003D29"} fontWeight={300} fontSize={"2xl"}>
                    &#8377;{productDetails.price}
                  </Text>
                </Box>

                <Stack
                  spacing={{ base: 4, sm: 6 }}
                  direction={"column"}
                  divider={
                    <StackDivider
                      borderColor={useColorModeValue("gray.200", "gray.600")}
                    />
                  }
                >
                  <VStack spacing={{ base: 4, sm: 6 }} align={"left"}>
                    <Text
                      fontSize={"2xl"}
                      fontWeight={"300"}
                      color={"#003D29"}
                    >
                      Description
                    </Text>
                    <Text fontSize={"lg"}>{productDetails.description}</Text>
                  </VStack>
                  <Box>
                    <Text
                      fontSize={{ base: "16px", lg: "18px" }}
                      color={useColorModeValue("yellow.500", "yellow.300")}
                      fontWeight={"500"}
                      textTransform={"uppercase"}
                      mb={"4"}
                    >
                      More Info
                    </Text>

                    <List spacing={2}>
                      <ListItem>
                        {productDetails.Stock > 0 ? (
                          <>
                            <Text
                              as={"span"}
                              color={"green"}
                              fontWeight={"bold"}
                            >
                              In Stock
                            </Text>
                          </>
                        ) : (
                          <>
                            <Text as={"span"} color={"red"} fontWeight={"bold"}>
                              Out of Stock
                            </Text>
                          </>
                        )}
                      </ListItem>
                      <ListItem>
                        <Text as={"span"} fontWeight={"bold"}>
                          No of reviews:
                        </Text>{" "}
                        {productDetails.noOfReviews}
                      </ListItem>
                      <ListItem>
                        <Text as={"span"} fontWeight={"bold"}>
                          Ratings:
                        </Text>{" "}
                        {productDetails.ratings}
                      </ListItem>
                      <ListItem>
                        <ReactStars
                          count={5}
                          edit={false}
                          size={24}
                          isHalf={true}
                          activeColor='#ffd700'
                          value={productDetails.ratings}
                        />
                      </ListItem>
                      <ListItem>
                        <Text as={"span"} fontWeight={"bold"}>
                          Quantity:
                        </Text>
                      </ListItem>
                      <HStack>
                        <Button
                          rounded={"none"}
                          w={"full"}
                          size={"md"}
                          py={"7"}
                          bg={useColorModeValue("gray.900", "gray.50")}
                          color={useColorModeValue("white", "gray.900")}
                          textTransform={"uppercase"}
                          colorScheme="green"
                          _hover={{
                            transform: "translateY(2px)",
                            boxShadow: "lg",
                          }}
                          onClick={(e) => {
                            e.preventDefault();
                            if (quantity > 1) {
                              setQuantity(quantity - 1);
                            }
                          }}
                        >
                          -
                        </Button>
                        <Input
                          textAlign={"center"}
                          py={"7"}
                          variant='outline'
                          htmlSize={4}
                          value={quantity}
                          readOnly
                          placeholder=''
                          type='number'
                          bg={useColorModeValue("gray.200", "gray.50")}
                        />
                        <Button
                          rounded={"none"}
                          w={"full"}
                          size={"md"}
                          py={"7"}
                          bg={useColorModeValue("gray.900", "gray.50")}
                          color={useColorModeValue("white", "gray.900")}
                          colorScheme="green"
                          textTransform={"uppercase"}
                          _hover={{
                            transform: "translateY(2px)",
                            boxShadow: "lg",
                          }}
                          onClick={(e) => {
                            e.preventDefault();
                            if (quantity < productDetails.Stock) {
                              setQuantity(quantity + 1);
                            }
                          }}
                        >
                          +
                        </Button>
                      </HStack>
                    </List>
                  </Box>
                </Stack>

                <Button
                  rounded={"none"}
                  w={"full"}
                  size={"lg"}
                  bg={useColorModeValue("gray.900", "gray.50")}
                  color={useColorModeValue("white", "gray.900")}
                  textTransform={"uppercase"}
                  colorScheme="green"
                  _hover={{
                    transform: "translateY(2px)",
                    boxShadow: "lg",
                  }}
                  onClick={(e) => {
                    e.preventDefault();
                    dispatch(addToCartRequest({ id, quantity }));
                  }}
                >
                  Add to cart
                </Button>
              </Stack>
            </SimpleGrid>
          </Container>
          <Container maxW={"7xl"} p={0}>
            <Heading color={"#003D29"} fontFamily={"'Poppins', sans-serif"} >Reviews</Heading>
            <Stack direction={{ base: "column", md: "row" }}>
              {productDetails &&
                productDetails.reviews &&
                productDetails.reviews.map((review) => {
                  return <ReviewsCard key={review.user} {...review} />;
                })}
            </Stack>
          </Container>
          <Box mx={"auto"} maxW={"7xl"} bg='white' borderRadius='lg'>
            <Box color='#0B0E3F'>
              <VStack my={"5"} spacing={5}>
                <FormControl id='review'>
                  <FormLabel fontWeight={"600"} my={0.5}>Your Review Matters !!!</FormLabel>
                  <ReactStars
                    count={5}
                    edit={true}
                    size={24}
                    isHalf={true}
                    activeColor='#ffd700'
                    value={rating}
                    onChange={(e) => {
                      setrating(e);
                    }}
                  />
                  <Textarea
                    borderColor='gray.300'
                    resize={"none"}
                    rows={"8"}
                    _hover={{
                      borderRadius: "gray.300",
                    }}
                    placeholder='Type your review ...'
                    value={comment}
                    onChange={(e) => {
                      setcomment(e.target.value);
                    }}
                  />
                </FormControl>
                <FormControl float='right'>
                  <Button
                    rounded={"none"}
                    size={"lg"}
                    bg={useColorModeValue("gray.900", "gray.50")}
                    color={useColorModeValue("white", "gray.900")}
                    textTransform={"uppercase"}
                    colorScheme="green"
                    _hover={{
                      transform: "translateY(2px)",
                      boxShadow: "lg",
                    }}
                    onClick={handleReviewSumbit}
                  >
                    Add Review
                  </Button>
                </FormControl>
              </VStack>
            </Box>
          </Box>
        </>
      ) : (
        <AlertBox type='error' message={products.error.message} />
      )}
    </>
  );
};

const ReviewsCard = ({ name, rating, comment }) => {
  return (
    <>
      <Center py={6} fontFamily={"'Poppins', sans-serif"}>
        <Box
          maxW={"450px"}
          w={"full"}
          bg={useColorModeValue("white", "gray.900")}
          boxShadow={"xl"}
          rounded={"lg"}
          p={6}
          textAlign={"center"}
        >
          <Avatar
            size={"xl"}
            src={AvtarImg}
            mb={4}
            pos={"relative"}
            _after={{
              content: '""',
              w: 4,
              h: 4,
              bg: "green.300",
              border: "2px solid white",
              rounded: "full",
              pos: "absolute",
              bottom: 0,
              right: 3,
            }}
          />
          <Heading fontSize={"2xl"} fontFamily={"'Poppins', sans-serif"}>
            {name}
          </Heading>
          <HStack justify={"center"}>
            <Text fontWeight={800}>Rating :</Text>
            <ReactStars
              count={5}
              edit={false}
              size={24}
              isHalf={true}
              activeColor='#ffd700'
              value={rating}
            />
          </HStack>
          <Text
            textAlign={"center"}
            color={useColorModeValue("gray.700", "gray.400")}
            p={3}
          >
            {comment}
          </Text>
        </Box>
      </Center>
    </>
  );
};

export default ProductDetails;
