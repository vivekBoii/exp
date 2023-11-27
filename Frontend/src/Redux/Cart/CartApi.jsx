import axios from "axios";

export function AddToCartApi(value) {
    // const config={headers:{"Content-Type":"multipart/form-data"},withCredentials: true,};
    return axios.get(`http://localhost:4000/api/v1/product/${value.id}`);
}