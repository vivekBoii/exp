// todo 
// no result found 
// // loader 
import {
  Box,
  Stack,
  Card,
  Image,
  CardBody,
  Heading,
  Button,
  Text,
  ButtonGroup,
  Menu,
  MenuButton,
  MenuList,
  MenuDivider,
  RangeSlider,
  RangeSliderTrack,
  RangeSliderFilledTrack,
  RangeSliderThumb,
  HStack,
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
  SliderMark,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchAllProduct } from "../Redux/Product/productReducer";
import Loader from "../Component/Spinner/Spinner";
import AlertBox from "../Component/Alert/Alert";
import { Link, useNavigate, useParams } from "react-router-dom";
import ReactStars from "react-rating-stars-component";
import Pagination from "react-js-pagination";
import "./Product.css";
import { ChevronDownIcon } from "@chakra-ui/icons";

const categoryList = [
  "Laptop",
  "Footwear",
  "Bottom",
  "Tops",
  "Attire",
  "Camera",
  "SmartCamera",
];

const Product = () => {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products);
  const resultPerPage = useSelector((state) => state.products.resultPerPage);
  const filteredProductsCount = useSelector(
    (state) => state.products.filteredProductsCount
  );
  const { keyword } = useParams();
  const [activePage, setActivePage] = useState(1);
  // price 
  const [slider, setslider] = useState([0, 100]);
  const [priceRange, setPricePage] = useState([0, 100000]);
  const [category, setCategory] = useState("");
  // rating 
  const [starRating, setstarRating] = useState(0);
  const [starRatingFinal, setstarRatingFinal] = useState(0)
  

  useEffect(() => {
    dispatch(fetchAllProduct({ keyword, activePage, priceRange,category,starRatingFinal }));
  }, [dispatch, keyword, activePage, priceRange,category,starRatingFinal]);

  const handlePageChange = (pageNumber) => {
    setActivePage(pageNumber);
  };

  const rangeCancel = (e) => {
    e.preventDefault();
    setPricePage([0, 100000]);
  };

  const rangeSave = (e) => {
    e.preventDefault();
    setPricePage(
      slider.map((item) => {
        return item * 1000;
      })
    );
  };

  const handleRatingClose = (e) => {
    e.preventDefault();
    setstarRatingFinal(0);
  };

  const handleRatingSave = (e) => {
    e.preventDefault();
    setstarRatingFinal(starRating/20);
  };


  return (
    <>
      {products.status === "loading" ? (
        <Loader />
      ) : products.status === "success" ? (
        <>
          <Box
            maxW={"10xl"}
            fontFamily={"poppins"}
            margin={"auto"}
            px={{ base: 2, md: 10 }}
            my={10}
            minH={"80vh"}
          >
            <Heading color={"#003D29"} textAlign={"center"} my={5} fontFamily={"poppins"}>
              Products
            </Heading>
            <Stack
              direction={"row"}
              align={"center"}
              gap={"5"}
              my={"5"}
              mb={10}
              mx={"auto"}
              w={"7xl"}
            >
              <Text color={"gray"}>Filter by</Text>
              <Box>
                <Menu>
                  <MenuButton
                    as={Button}
                    rightIcon={<ChevronDownIcon />}
                    fontWeight={400}
                  >
                    Range
                  </MenuButton>
                  <MenuList p={5}>
                    <RangeSlider
                      aria-label={["min", "max"]}
                      defaultValue={[0, 100]}
                      colorScheme='green'
                      onChangeEnd={(val) => setslider(val)}
                    >
                      <RangeSliderTrack>
                        <RangeSliderFilledTrack />
                      </RangeSliderTrack>
                      <RangeSliderThumb index={0} />
                      <RangeSliderThumb index={1} />
                    </RangeSlider>
                    <Text>{`₹${slider[0] * 1000} - ₹${slider[1] * 1000}`}</Text>
                    <MenuDivider />
                    <HStack justify={"space-between"}>
                      <Button
                        size='sm'
                        onClick={rangeCancel}
                        colorScheme='green'
                      >
                        cancel
                      </Button>
                      <Button size='sm' onClick={rangeSave} colorScheme='green'>
                        save
                      </Button>
                    </HStack>
                  </MenuList>
                </Menu>
              </Box>
              <Box>
                <Menu>
                  <MenuButton
                    as={Button}
                    rightIcon={<ChevronDownIcon />}
                    fontWeight={400}
                  >
                    Category
                  </MenuButton>
                  <MenuList p={5} cursor={"pointer"}>
                    {categoryList.map((categorylistitem,index) => {
                      return (
                        <Box
                        _hover={{
                          paddingLeft: "1",
                        }}
                        >
                          <Text
                            key={index}
                            style={{
                              color:
                                category === categorylistitem ? "green" : "black",
                            }}
                            onClick={() => {
                              setCategory(categorylistitem);
                            }}
                          >
                            {categorylistitem}
                          </Text>
                        </Box>
                      );
                    })}
                  </MenuList>
                </Menu>
              </Box>
              <Box>
                <Menu>
                  <MenuButton
                    as={Button}
                    rightIcon={<ChevronDownIcon />}
                    fontWeight={400}
                  >
                    Ratings
                  </MenuButton>
                  <MenuList p={5}>
                    <Slider colorScheme="green" aria-label='slider-ex-1' step={5} defaultValue={0} onChange={(val) => setstarRating(val)}>
                      <SliderMark value={0}>
                        0
                      </SliderMark>
                      <SliderMark value={20}>
                        1
                      </SliderMark>
                      <SliderMark value={40} >
                        2
                      </SliderMark>
                      <SliderMark value={60}>
                        3
                      </SliderMark>
                      <SliderMark value={80}>
                        4
                      </SliderMark>
                      <SliderMark value={100} >
                        5
                      </SliderMark>
                      <SliderTrack>
                        <SliderFilledTrack />
                      </SliderTrack>
                      <SliderThumb />
                    </Slider>
                    <MenuDivider />
                    <HStack justify={"space-between"}>
                      <Button
                        size='sm'
                        onClick={handleRatingClose}
                        colorScheme='green'
                      >
                        cancel
                      </Button>
                      <Button size='sm' onClick={handleRatingSave} colorScheme='green'>
                        save
                      </Button>
                    </HStack>
                  </MenuList>
                </Menu>
              </Box>
            </Stack>
            <Stack
              direction={{ base: "column", md: "row" }}
              flexWrap={"wrap"}
              gap={10}
              justify={"center"}
            >
              {products.status === "loading" ? (
                <Loader />
              ) : (
                products &&
                products.productItem &&
                products.productItem.map((item) => {
                  return <Scard key={item._id} product={item} />;
                })
              )}
            </Stack>
          </Box>
          <Box maxW={"10xl"} fontFamily={"poppins"} margin={"auto"} my={10}>
            {resultPerPage < filteredProductsCount && (
              <Pagination
                activePage={activePage}
                itemsCountPerPage={resultPerPage}
                totalItemsCount={filteredProductsCount}
                onChange={handlePageChange}
                nextPageText='Next'
                prevPageText='Prev'
                firstPageText='First'
                lastPageText='Last'
                itemClass='pageItem'
                linkClass='pageLink'
                activeClass='pageItemActive'
                activeLinkClass='pageLinkActive'
              />
            )}
          </Box>
        </>
      ) : (
        <AlertBox type='error' message={products.error.message} />
      )}
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


export default Product;
