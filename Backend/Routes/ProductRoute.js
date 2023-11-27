const express = require("express");
const {getAllProducts,createProduct,getProductById, updateProduct , deleteProduct, createProductReview, getProductReviews, deleteReview, getAdminProducts, ProductsWithOutPage} = require("../Controller/ProductController");
const { isAuthenticatedUser ,authorizeRoles } = require("../middleware/auth");
const router = express.Router();
 
router.route("/products").get(getAllProducts);
router.route("/products/noPage").get(ProductsWithOutPage);
router.route("/admin/products").get(isAuthenticatedUser,authorizeRoles("admin"),getAdminProducts);
router.route("/admin/product/new").post(isAuthenticatedUser,authorizeRoles("admin") ,createProduct);
router.route("/product/:id").get(getProductById);
router.route("/admin/product/:id").put(isAuthenticatedUser,authorizeRoles("admin") ,updateProduct);
router.route("/admin/product/:id").delete(isAuthenticatedUser,authorizeRoles("admin") ,deleteProduct);
router.route("/review").put(isAuthenticatedUser,createProductReview);
router.route("/reviews").get(getProductReviews).delete(isAuthenticatedUser,deleteReview);

module.exports = router;