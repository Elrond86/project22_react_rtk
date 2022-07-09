import { configureStore } from '@reduxjs/toolkit'
import UIReducer from '../slices/ui/UISlice'
import usersReducer from '../slices/users/UsersSlices'
import api from '../utils/api'

const store = configureStore({
	reducer: {
		UI: UIReducer,
		users: usersReducer,
		[api.reducerPath]: api.reducer
	},
	middleware: getDefaultMiddleware => getDefaultMiddleware().concat(api.middleware)
})

export default store
