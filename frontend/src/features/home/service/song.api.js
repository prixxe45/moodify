import axios from 'axios';


const api = axios.create({
  baseURL: 'http://localhost:3000/api',
})

export async function getSong({songFile, mood}) {
const response = await api.get("/songs?mood=" + mood);
console.log("API response:", response);
return response.data;
}