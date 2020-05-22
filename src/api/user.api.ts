import axios from 'axios'

const DOMAIN_API = 'http://192.168.1.105:8000/api';

interface User {
    id: number;
}

export const fetchUser = async () => {
    axios.defaults.headers.common["Authorization"] = "Bearer " + localStorage.getItem("EON_API_TOKEN_ACCESS");

    const url = `${DOMAIN_API}/user`;
    const userResponse = await axios.get<User>(url);

    return userResponse.data;
};