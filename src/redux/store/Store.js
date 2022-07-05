import { configureStore } from '@reduxjs/toolkit'
import UIReducer from '../slices/ui/UISlice'

const store = configureStore({
	reducer: {
		UI: UIReducer,
	},
})

export default store
