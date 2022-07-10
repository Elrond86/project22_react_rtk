import { configureStore } from '@reduxjs/toolkit'
import uiReducer from '../ui/UISlices'
import authReducer from '../authentication/AuthenticationSlices'
import api from '../utils/api'

const store = configureStore({
	reducer: {
		ui: uiReducer,
		auth: authReducer,
		[api.reducerPath]: api.reducer
	},
	middleware: getDefaultMiddleware => getDefaultMiddleware().concat(api.middleware)
})

export default store
