/**
 * @file main.jsx
 * @brief The entry point for the React application.
 *
 * This file is responsible for rendering the root component of the application (`App`)
 * into the DOM. It sets up the React Strict Mode for development checks and wraps the
 * entire application with the `MyListProvider` to make the "My List" context
 * available to all components.
 */
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { MyListProvider } from "./context/MyListContext.jsx"; 

// Get the root DOM element where the React app will be mounted.
const rootElement = document.getElementById('root');

// Create a React root for the main application container.
const root = ReactDOM.createRoot(rootElement);

// Render the application.
root.render(
  // React.StrictMode is a tool for highlighting potential problems in an application.
  // It activates additional checks and warnings for its descendants.
  <React.StrictMode>
    {/* 
      MyListProvider wraps the entire application, making the "My List"
      context available to any component that needs it.
    */}
    <MyListProvider>
      <App />
    </MyListProvider>
  </React.StrictMode>
);
