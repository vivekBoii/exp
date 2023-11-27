import axios from "axios";
export function fetchAllProductApi(keyword,activePage,priceRange,category,starRatingFinal) {
    if(category===""){
    return axios.get(`http://localhost:4000/api/v1/products?keyword=${keyword}&page=${activePage}&price[gte]=${priceRange[0]}&price[lte]=${priceRange[1]}&ratings[gte]=${starRatingFinal}`);
    }
    else{
        return axios.get(`http://localhost:4000/api/v1/products?keyword=${keyword}&page=${activePage}&price[gte]=${priceRange[0]}&price[lte]=${priceRange[1]}&category=${category}&ratings[gte]=${starRatingFinal}`);
    }
}

export function ProductwithoutPageApi() {
    return axios.get(`http://localhost:4000/api/v1/products/noPage`);
}

export function fetchProductDetailsApi(id) {
    return axios.get(`http://localhost:4000/api/v1/product/${id}`)
}

export function newReviewRequestApi(value) {
    const config={headers:{"Content-Type":"application/json"},withCredentials: true}
    return axios.put(`http://localhost:4000/api/v1/review`,value,config);
}

export function adminProductListRequestApi() {
    const config={headers:{"Content-Type":"application/json"},withCredentials: true}
    return axios.get(`http://localhost:4000/api/v1/products`,config);
}

export function newProductAdminApi(value) {
    console.log(value)
    const config={headers:{"Content-Type":"multipart/form-data"},withCredentials: true,};
    console.log(value)
    return axios.post(`http://localhost:4000/api/v1/admin/product/new`,value,config);
}

export function deleteProductAdminApi(id) {
    const config={headers:{"Content-Type":"application/json"},withCredentials: true}
    return axios.delete(`http://localhost:4000/api/v1/admin/product/${id}`,config);
}

export function updateProductAdminApi({myForm,id}) {
    const config={headers:{"Content-Type":"multipart/form-data"},withCredentials: true,};
    return axios.put(`http://localhost:4000/api/v1/admin/product/${id}`,myForm,config);
}

export function AllReviewsAdminApi(id) {
    const config={headers:{"Content-Type":"multipart/form-data"},withCredentials: true,};
    return axios.get(`http://localhost:4000/api/v1/reviews?id=${id}`,config);
}

export function deleteReviewsAdminApi({reviewId,productId}) {
    const config={headers:{"Content-Type":"application/json"},withCredentials: true,};
    return axios.delete(`http://localhost:4000/api/v1/reviews?id=${reviewId}&productId=${productId}`,config);
}
