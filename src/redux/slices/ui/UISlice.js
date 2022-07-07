import { createSlice } from '@reduxjs/toolkit'
import { loginUserAction } from '../users/UsersSlices'

const initialState = {
	loginPending: false, //Ladeanzeige, während etwas passiert, damit Benutzer sieht, dass er gerade läd
	showLoginDialog: false, //das is des, was vorher im Widged war. Kommt jetzt in den Zentralen store
	error: null,
	showUserManagement: null
}

let UISlice = createSlice({
	name: 'UI',
	initialState,

	/** reducer sind zum manipulieren vom State OHNE API-Zugriff */
	reducers: {
		showLoginModal: (state, action) => {
			state.showLoginDialog = true /** ...state not requiered... Denn es benutzt intern IMMER-Library!! :D */
			console.log('state.showLoginDialog: ')
			console.log(state.showLoginDialog)
		},
		hideLoginModal: (state, action) => {
			state.showLoginDialog = false
			console.log('state.showLoginDialog: ')
			console.log(state.showLoginDialog)
		},
		showUserManagement: (state, action) => {
			state.showUserManagement = true
		},
		hideUserManagement: (state, action) => {
			state.showUserManagement = false
		}
	},

	extraReducers: builder => {
		builder.addCase(loginUserAction.fulfilled, (state, action) => {
			state.showLoginDialog = false
			console.log('state.showLoginDialog: ')
			console.log(state.showLoginDialog)
		})
	}
})

export const { showLoginModal, hideLoginModal, showUserManagement, hideUserManagement } = UISlice.actions

export const selectShowUsers = state => state.UI.showUserManagement

export default UISlice.reducer
