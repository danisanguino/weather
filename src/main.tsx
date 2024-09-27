import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

if (!navigator.geolocation) {
  alert ("Tu navegador no tiene localización!! TIESO");
  throw new Error("Tu navegador no tiene localización!!")
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
