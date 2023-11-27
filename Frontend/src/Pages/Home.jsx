import {
  Stack,
  Flex,
  Button,
  Text,
  VStack,
  useBreakpointValue,
  Card,
  CardBody,
  Image,
  ButtonGroup,
  Heading,
  Box,
  SimpleGrid,
} from "@chakra-ui/react";
import back from "../assets/Home/back.png";
import back2 from "../assets/Home/back2.png";
import ReactStars from "react-rating-stars-component";
import Metadata from "../Component/Metadata";
import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { fetchAllProduct } from "../Redux/Product/productReducer";
import Loader from "../Component/Spinner/Spinner";
import AlertBox from "../Component/Alert/Alert";
import cat1 from "../assets/Home/cat1.png";
import cat2 from "../assets/Home/cat2.png";
import cat3 from "../assets/Home/cat3.png";
import cat4 from "../assets/Home/cat4.png";
import cat5 from "../assets/Home/cat5.png";
import cat6 from "../assets/Home/cat6.png";
import { addToCartRequest } from "../Redux/Cart/cartReducer";

const Home = () => {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products);
  const navigateTo = useNavigate();


  useEffect(() => {
    dispatch(fetchAllProduct({}));
  }, [dispatch]);

  return (
    <>
      <Metadata title={"Ecommerce - Home"} />
      {products.error ? (
        <AlertBox type='error' message={products.error.message} />
      ) : null}
      <Flex
        h={"80vh"}
        w={"full"}
        fontFamily={"poppins"}
        backgroundImage={back}
        backgroundSize={"cover"}
        backgroundPosition={"50% 50%"}
      >
        <VStack
          w={"full"}
          justify={"center"}
          align={"start"}
          color={"#003D29"}
          maxW={"7xl"}
          mx={"auto"}
        >
          <Stack maxW={"lg"} spacing={6}>
            <Heading fontSize={"5xl"} fontWeight={700} fontFamily={"poppins"}>
              Shopping and Department Store.
            </Heading>
            <Text
              color={"#003D29"}
              fontWeight={400}
              lineHeight={1.2}
              fontSize={useBreakpointValue({ base: "2xl", md: "3xl" })}
            >
              Discover the finest eCommerce destination in the universe
            </Text>
            <Stack direction={"row"}>
              <Button
                bg={"#003D29"}
                rounded={"full"}
                color={"white"}
                fontSize={"xl"}
                colorScheme="green"
                p={5}
                fontWeight={500}
                onClick={(e)=>{
                  e.preventDefault();
                  navigateTo('/Products');
                }}
              >
                Explore Now
              </Button>
            </Stack>
          </Stack>
        </VStack>
      </Flex>
      <Box
        maxW={"7xl"}
        mx={"auto"}
        py={useBreakpointValue({ base: "10", md: "20" })}
      >
        <Text
          color={"black"}
          fontWeight={500}
          fontFamily={"poppins"}
          lineHeight={1.2}
          my={"10"}
          fontSize={useBreakpointValue({ base: "3xl", md: "4xl" })}
        >
          Our Top Categories
        </Text>
        <SimpleGrid
          maxW={"7xl"}
          mx={"auto"}
          columns={{ base: 1, md: 2, lg: 3, xl: 6 }}
          spacing={10}
        >
          {categories.map((item) => {
            return (
              <>
                <Link to={`/Products`}>
                  <Card
                    maxW='xs'
                    fontFamily={"poppins"}
                    color={"black"}
                    position={"relative"}
                  >
                    <Image
                      src={item.src}
                      borderRadius={"5px"}
                      alt={item.name}
                    />
                    <Text
                      position={"absolute"}
                      top={"20px"}
                      fontSize={"xl"}
                      fontWeight={"600"}
                      color={"white"}
                      w={"full"}
                      textAlign={"center"}
                    >
                      {item.name}
                    </Text>
                  </Card>
                </Link>
              </>
            );
          })}
        </SimpleGrid>
      </Box>
      <Box maxW={"7xl"} mx={"auto"}>
        <Text
          color={"black"}
          fontWeight={500}
          fontFamily={"poppins"}
          lineHeight={1.2}
          py={"10"}
          fontSize={useBreakpointValue({ base: "3xl", md: "4xl" })}
        >
          Our Top Products
        </Text>
        <SimpleGrid columns={{ base: 1, md: 2, lg: 3, xl: 4 }} spacing={10}>
          {products.status === "loading" ? (
            <Loader />
          ) : (
            products.productItem &&
            products.productItem.map((item) => {
              return <Scard key={item._id} product={item} />;
            })
          )}
        </SimpleGrid>
      </Box>
      <Flex
        w={"full"}
        h={"80vh"}
        my={"20"}
        fontFamily={"poppins"}
        backgroundImage={back2}
        backgroundSize={"cover"}
        backgroundPosition={"50% 80%"}
      >
        <VStack
          w={"full"}
          justify={"center"}
          align={"end"}
          color={"#003D29"}
          maxW={"7xl"}
          mx={"auto"}
          px={useBreakpointValue({ base: 4, md: 20 })}
        >
          <Stack maxW={"xl"} spacing={6} bg={"#003D29"} color={"white"} p={"14"}>
            <Heading fontSize={"5xl"} fontWeight={500} fontFamily={"poppins"}>
            Get 5% Cash Back On $200
            </Heading>
            <Text
              fontWeight={400}
              lineHeight={1.2}
              fontSize={useBreakpointValue({ base: "3xl", md: "2xl" })}
            >
              Shopping is a bit of a relaxing hobby for me, which is sometimes troubling for the bank balance.
            </Text>
            <Stack direction={"row"} >
              <Button
                bg={"#003D29"}
                rounded={"full"}
                border={"1px solid white"}
                color={"white"}
                fontSize={"xl"}
                p={6}
                fontWeight={500}
                colorScheme="green"
                onClick={(e)=>{
                  e.preventDefault();
                  navigateTo('/Products');
                }}
              >
                Explore Now
              </Button>
            </Stack>
          </Stack>
        </VStack>
      </Flex>
    </>
  );
};
const Scard = ({ product }) => {
  const dispatch = useDispatch();
  const navigateTo = useNavigate();
  const productImg = product.images[0].url ? product.images[0].url : "";
  return (
    <>
      <Card maxW='xs' fontFamily={"poppins"} color={"black"}>
        <Link to={`/product/${product._id}`}>
          <Box
            w={"full"}
            h={"320px"}
            display={"flex"}
            alignItems={"center"}
            justifyContent={"center"}
          >
            <Image maxH={"80%"} src={productImg} alt='' />
          </Box>
        </Link>
        <CardBody>
          <Link to={`/product/${product._id}`}>
            <Stack spacing='1'>
              <Heading
                color={"black"}
                fontFamily={"poppins"}
                fontWeight={500}
                size='md'
              >
                {product.name}
              </Heading>
              <Box display={"flex"} alignItems={"center"}>
                <ReactStars
                  count={5}
                  edit={false}
                  size={24}
                  isHalf={true}
                  activeColor='#ffd700'
                  value={product.ratings}
                />
                <Box as='span' pt={"1"}>
                  | {product.noOfReviews} reviews
                </Box>
              </Box>
              <Text color='green' fontSize='2xl'>
                &#8377;{product.price}
              </Text>
            </Stack>
          </Link>
          <ButtonGroup spacing='2' mt={2}>
            <Button
              onClick={() => {
                navigateTo(`/product/${product._id}`);
              }}
              variant='solid'
              colorScheme='green'
            >
              Buy now
            </Button>
            <Button
              onClick={(e) => {
                e.preventDefault();
                dispatch(addToCartRequest({ Id: product._id, quantity: 1 }));
              }}
              variant='ghost'
              colorScheme='green'
            >
              Add to cart
            </Button>
          </ButtonGroup>
        </CardBody>
      </Card>
    </>
  );
};

const categories = [
  {
    name: "Furniture",
    src: cat1,
  },
  {
    name: "Hand Bag",
    src: cat2,
  },
  {
    name: "Books",
    src: cat3,
  },
  {
    name: "Tech",
    src: cat4,
  },
  {
    name: "Sneakers",
    src: cat5,
  },
  {
    name: "Travel",
    src: cat6,
  },
];

export default Home;
