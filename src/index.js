import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'

import App from './App'

import './index.css'
import '@fortawesome/fontawesome-free/css/all.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'react-bootstrap/dist/react-bootstrap.js'

import { Provider } from 'react-redux' //Bridge-Library between redux.json & redux library
import store from './redux/store/Store'

const root = ReactDOM.createRoot(document.getElementById('root'))

root.render(
	<React.StrictMode>
		<BrowserRouter>
			<Provider store={store}>
				{/* damit ist store für die ganze App ("global") verfügbar. */}
				<App />
			</Provider>
		</BrowserRouter>
	</React.StrictMode>
)
