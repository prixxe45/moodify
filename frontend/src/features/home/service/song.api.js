import axios from 'axios';


const api = axios.create({
  baseURL: 'https://moodify-9pce.onrender.com/api',
})

export async function getSong({songFile, mood}) {
const response = await api.get("/songs?mood=" + mood);
console.log("API response:", response);
return response.data;
}
