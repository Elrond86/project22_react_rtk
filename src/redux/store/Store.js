import { configureStore } from '@reduxjs/toolkit'
import UIReducer from '../slices/ui/UISlice'
import usersReducer from '../slices/users/UsersSlices'

const store = configureStore({
	reducer: {
		UI: UIReducer,
		users: usersReducer,
	},
})

export default store
