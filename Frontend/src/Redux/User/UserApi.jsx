import axios from "axios";
export function loginRequestApi({email,password}) {
    const config={headers:{"Content-Type":"application/json"},withCredentials: true};
    return axios.post(`http://localhost:4000/api/v1/login`,{email,password},config);
}

export function SignUpRequestApi(value) {
    const config={headers:{"Content-Type":"multipart/form-data"},withCredentials: true,};
    return axios.post(`http://localhost:4000/api/v1/register`,value,config);
}

export function loadUserRequestApi() {
    const config={headers:{"Content-Type":"application/json"},withCredentials: true}
    return axios.get(`http://localhost:4000/api/v1/me`,config);
}

export function logoutRequestApi() {
    const config={headers:{"Content-Type":"application/json"},withCredentials: true}
    return axios.get(`http://localhost:4000/api/v1/logout`,config);
}

export function updateProfileRequestApi(value) {
    const config={headers:{"Content-Type":"multipart/form-data"},withCredentials: true}
    return axios.put(`http://localhost:4000/api/v1/me/update`,value,config);
}

export function updatePasswordRequestApi(value) {
    const config={headers:{"Content-Type":"application/json"},withCredentials: true}
    return axios.put(`http://localhost:4000/api/v1/password/update`,value,config);
}


export function forgotPasswordRequestApi(value) {
    const config={headers:{"Content-Type":"application/json"},withCredentials: true}
    return axios.post(`http://localhost:4000/api/v1/password/forgot`,value,config);
}

export function resetPasswordRequestApi(value) {
    const config={headers:{"Content-Type":"application/json"},withCredentials: true}
    return axios.put(`http://localhost:4000/api/v1/password/reset/${value.token}`,value,config);
}

export function getAllUsersApi() {
    const config={headers:{"Content-Type":"application/json"},withCredentials: true}
    return axios.get(`http://localhost:4000/api/v1/admin/users`,config);
}

export function getSingleUserAdminApi(id) {
    const config={headers:{"Content-Type":"application/json"},withCredentials: true}
    return axios.get(`http://localhost:4000/api/v1/admin/user/${id}`,config);
}

export function UpdateUserAdminApi({id,values}) {
    const config={headers:{"Content-Type":"application/json"},withCredentials: true}
    return axios.put(`http://localhost:4000/api/v1/admin/user/${id}`,values,config);
}

export function deleteUserAdminApi(id) {
    const config={headers:{"Content-Type":"application/json"},withCredentials: true}
    return axios.delete(`http://localhost:4000/api/v1/admin/user/${id}`,config);
}

