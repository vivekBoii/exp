const Product = require("../Models/ProductModels");
const ApiFeatures = require("../Utils/Features");
const ErrorHander = require("../Utils/errorHander");
const catchAsyncErrors = require("../middleware/CatchAsyncError");
const cloudinary = require("cloudinary");

//create Product -- admin
exports.createProduct = catchAsyncErrors(async (req, res, next) => {
  console.log(req.body.images);

  let images = [];
  if (typeof req.body.images === "string") {
    console.log("sexy");
    images.push(req.body.images);
  } else {
    images = req.body.images;
  }

  const imagesLink = [];

  for (let i = 0; i < images.length; i++) {
    const result = await cloudinary.v2.uploader.upload(images[i], {
      folder: "products",
    });

    imagesLink.push({
      public_id: result.public_id,
      url: result.secure_url,
    });
  }

  req.body.images = imagesLink;
  req.body.user = req.user.id;
  console.log(req.body);
  const product = await Product.create(req.body);

  res.status(201).json({
    success: true,
    product,
  });
});

// get all products
exports.getAllProducts = catchAsyncErrors(async (req, res) => {
  const resultPerPage = 8;
  const productCount = await Product.countDocuments();

  let apiFeature = new ApiFeatures(Product.find(), req.query).search().filter();
  let products = await apiFeature.query;
  let filteredProductsCount = products.length;
  apiFeature = new ApiFeatures(Product.find(), req.query)
    .search()
    .filter()
    .pagination(resultPerPage);
  products = await apiFeature.query;

  // console.log(products);
  res.status(200).json({
    message: "Route is Working Fine",
    products,
    productCount,
    resultPerPage,
    filteredProductsCount,
  });
});

// get all products without page
exports.ProductsWithOutPage = catchAsyncErrors(async (req, res) => {
  const productCount = await Product.countDocuments();

  const products = await Product.find();

  // console.log(products);
  res.status(200).json({
    message: "Route is Working Fine",
    products,
    productCount,
  });
});

// get product by id
exports.getProductById = catchAsyncErrors(async (req, res, next) => {
  const product = await Product.findById(req.params.id);
  if (!product) {

    return next(new ErrorHander("product not found", 404));
  }
  res.status(200).json({
    message: "Route is Working Fine",
    product,
  });
});

exports.getAdminProducts = catchAsyncErrors(async (req, res, next) => {
  const products = await Product.find();

  res.status(200).json({
    success: true,
    products,
  });
});

// update product by id -- admin
exports.updateProduct = catchAsyncErrors(async (req, res, next) => {
  let product = await Product.findById(req.params.id);
  if (!product) {
    return next(new ErrorHander("product not found", 404));
  }

  let images = [];
  if (typeof req.body.images === "string") {
    images.push(req.body.images);
  } else {
    images = req.body.images;
  }

  if(images!== undefined){
    for (let i = 0; i < product.images.length; i++) {
      await cloudinary.v2.uploader.destroy(
        product.images[i].public_id
      );
    }

    // console.log(product.images);


    const imagesLink = [];

    for (let i = 0; i < images.length; i++) {
      const result = await cloudinary.v2.uploader.upload(images[i], {
        folder: "products",
      });
  
      imagesLink.push({
        public_id: result.public_id,
        url: result.secure_url,
      });
    }
    req.body.images = imagesLink;
  }

  product = await Product.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });
  res.status(200).json({
    success: true,
    product,
  });
});

// delete product by id -- admin
exports.deleteProduct = async (req, res, next) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);

    for (let i = 0; i < product.images.length; i++) {
      await cloudinary.v2.uploader.destroy(
        product.images[i].public_id
      );
    }
    res.status(200).json({
      success: true,
      message: "product deleted successfully",
    });
  } catch (error) {
    return next(new ErrorHander("product don't exist", 404));
  }
};

// make review or update them
// Create New Review or Update the review
exports.createProductReview = catchAsyncErrors(async (req, res, next) => {
  const { rating, comment, productId } = req.body;

  const review = {
    user: req.user._id,
    name: req.user.name,
    rating: Number(rating),
    comment,
  };

  const product = await Product.findById(productId);

  const isReviewed = product.reviews.find(
    (rev) => rev.user.toString() === req.user._id.toString()
  );

  if (isReviewed) {
    product.reviews.forEach((rev) => {
      if (rev.user.toString() === req.user._id.toString())
        (rev.rating = rating), (rev.comment = comment);
    });
  } else {
    product.reviews.push(review);
    product.noOfReviews = product.reviews.length;
  }

  let avg = 0;

  product.reviews.forEach((rev) => {
    avg += rev.rating;
  });

  product.ratings = avg / product.reviews.length;

  await product.save({ validateBeforeSave: false });

  res.status(200).json({
    success: true,
  });
});

// get all reviews
exports.getProductReviews = catchAsyncErrors(async (req, res, next) => {
  const product = await Product.findById(req.query.id);
  if (!product) {
    return next(new ErrorHander("product not found", 404));
  }
  res.status(200).json({
    message: "Route is Working Fine",
    reviews: product.reviews,
  });
});

//delete review
exports.deleteReview = catchAsyncErrors(async (req, res, next) => {
  const product = await Product.findById(req.query.productId);
  // console.log(product);
  if (!product) {
    return next(new ErrorHander("product not found", 404));
  }

  const reviews = product.reviews.filter(
    (rev) => rev._id.toString() !== req.query.id.toString()
  );

  let avg = 0;
  reviews.forEach((rev) => {
    avg += rev.rating;
  });
  let ratings;
  if(reviews.length===0){
    ratings = 0;
  }
  else{
    ratings = avg / reviews.length;
  }

  const noOfReviews = reviews.length;

  await Product.findByIdAndUpdate(
    req.query.productId,
    {
      reviews,
      ratings,
      noOfReviews,
    },
    {
      new: true,
      runValidators: true,
      useFindAndModify: false,
    }
  );

  await product.save({ validateBeforeSave: false });

  res.status(200).json({
    message: "deleted review succesfullty",
  });
});
