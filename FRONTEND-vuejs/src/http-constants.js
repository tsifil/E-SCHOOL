import axios from "axios";

let baseURL

if(!process.env.NODE_ENV || !process.env.NODE_ENV === 'development') {
    //baseURL = 'http://127.0.0.1/'
    baseURL = 'http://localhost:2002'
}
else{
    //baseURL = 'http://api.example.com'
    baseURL = 'http://localhost:2002'
}

export const HTTP = axios.create(
    {
        baseURL: baseURL
    }
)