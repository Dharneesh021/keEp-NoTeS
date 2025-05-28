import axios from "axios"

export default axios.create(
   { baseURL : 'https://json-server-db-u875.onrender.com/' || process.env.REACT_APP_API_URL}
)
