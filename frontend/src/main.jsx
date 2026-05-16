import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { AuthProvider } from "./features/auth/auth.context.jsx";
import App from './App.jsx'
import { SongProvider } from './features/home/song.context.jsx';

createRoot(document.getElementById('root')).render(
 
    <AuthProvider>
      <SongProvider>
        <App />
      </SongProvider>
    </AuthProvider>

) 

