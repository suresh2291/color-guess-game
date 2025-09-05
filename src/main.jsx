import React from 'react'
import ReactDOM from 'react-dom/client'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import { TouchBackend } from 'react-dnd-touch-backend'
import './i18n.js'
import './index.css'
import App from './App.jsx'

// Detect if device supports touch
const isTouchDevice = () => {
  return (('ontouchstart' in window) ||
          (navigator.maxTouchPoints > 0) ||
          (navigator.msMaxTouchPoints > 0))
}

// Choose backend based on device capability
const backend = isTouchDevice() ? TouchBackend : HTML5Backend

// Touch backend options for mobile devices
const touchOptions = {
  enableMouseEvents: true,
  delayTouchStart: 0, // No delay for immediate response
  delayMouseStart: 0,
  touchSlop: 8, // Reduced for more sensitive touch
  enableHoverOutsideTarget: false,
  enableKeyboardEvents: false,
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <DndProvider backend={backend} options={isTouchDevice() ? touchOptions : {}}>
      <App />
    </DndProvider>
  </React.StrictMode>,
)
