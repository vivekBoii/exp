import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { Provider } from "react-redux";
import { ChakraProvider , theme } from '@chakra-ui/react';
import store from './Redux/Store.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  // <React.StrictMode> error
    <Provider store={store}>
      <ChakraProvider theme={theme}>
        <App />
      </ChakraProvider>
    </Provider>
  // </React.StrictMode>,
)
