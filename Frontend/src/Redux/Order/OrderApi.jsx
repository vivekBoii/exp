import axios from "axios";

export function createOrderRequestApi(value) {
    const config={headers:{"Content-Type":"application/json"},withCredentials: true,};
    return axios.post(`http://localhost:4000/api/v1/order/new`,value,config);
}

export function myOrderRequestApi() {
    const config={headers:{"Content-Type":"application/json"},withCredentials: true,};
    return axios.get(`http://localhost:4000/api/v1/orders/me`,config);
}

export function OrderDetailsRequestApi(id) {
    console.log(id);
    const config={headers:{"Content-Type":"application/json"},withCredentials: true,};
    return axios.get(`http://localhost:4000/api/v1/order/${id}`,config);
}

export function getAllOrdersRequestApi() {
    const config={headers:{"Content-Type":"application/json"},withCredentials: true,};
    return axios.get(`http://localhost:4000/api/v1/admin/orders`,config);
}

export function UpdateOrderRequestApi({id,myForm}) {
    const config={headers:{"Content-Type":"application/json"},withCredentials: true,};
    return axios.put(`http://localhost:4000/api/v1/admin/order/${id}`,myForm,config);
}

export function DeleteOrderRequestApi(id) {
    const config={headers:{"Content-Type":"application/json"},withCredentials: true,};
    return axios.delete(`http://localhost:4000/api/v1/admin/order/${id}`,config);
}