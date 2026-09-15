import React from 'react'
import { createRoot, hydrateRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App.jsx'
import './styles/style.css'
import './styles/react.css'
import './styles/responsive-v9.css'

if (import.meta.env.PROD && 'serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register(`${import.meta.env.BASE_URL}sw.js`, {
      scope: import.meta.env.BASE_URL,
    }).catch((error) => {
      console.warn('KHIDevs service worker registration failed:', error)
    })
  })
}

const basePath=import.meta.env.BASE_URL.replace(/\/$/,'')
const basename=basePath || '/'
const rootElement=document.getElementById('root')
const app=(
  <React.StrictMode>
    <BrowserRouter basename={basename}>
      <App />
    </BrowserRouter>
  </React.StrictMode>
)

const prerenderPath=rootElement.dataset.prerenderPath
const pathname=window.location.pathname
let appPath=basePath && pathname.startsWith(basePath)?pathname.slice(basePath.length):pathname
if(!appPath) appPath='/'
const canHydrate=rootElement.hasChildNodes() && (!prerenderPath || prerenderPath===appPath)

if(canHydrate) hydrateRoot(rootElement,app)
else {
  if(rootElement.hasChildNodes()) rootElement.replaceChildren()
  createRoot(rootElement).render(app)
}
