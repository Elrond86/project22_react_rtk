import React from 'react'
import ReactDOM from 'react-dom/client'

import App from './App'

import './index.css'
import '@fortawesome/fontawesome-free/css/all.css'
import 'bootstrap/dist/css/bootstrap.min.css' //minified version of bootstrap.css - same functionality but unreadable
import 'react-bootstrap/dist/react-bootstrap.js'

import { Provider } from 'react-redux' //Bridge-Library between redux.json & redux library
import store from './redux/store'

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
	<React.StrictMode>
		<Provider store={store}>
			{/* damit ist store für die ganze App ("global") verfügbar. */}
			<App />
		</Provider>
	</React.StrictMode>
)
