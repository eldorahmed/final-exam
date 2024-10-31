import React from 'react'
import { Provider } from 'react-redux'
import store from './store/store.js'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { Toaster } from 'react-hot-toast'
import './i18n';
ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
  <App />
  <Toaster position='bottom-center'/>
  </Provider>
)
