import { createSlice } from '@reduxjs/toolkit'
import { loginUserAction, logoutUserAction } from '../users/UsersSlices'

const initialState = {
	loginPending: false, //Ladeanzeige, während etwas passiert, damit Benutzer sieht, dass er gerade lädt
	showLoginDialog: false, //das is des, was vorher im Widged war. Kommt jetzt in den Zentralen store
	error: null,
	showUserManagement: false,
	showEditUser: false,
	showDeleteUserConfirm: false,
	showCreateUser: false
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
			state.showEditUser = false
		},
		showCreateUserDialog: state => {
			state.showCreateUser = true
		},
		hideCreateUserDialog: state => {
			state.showCreateUser = false
		},
		showEditUserDialog: (state, { payload: userID }) => {
			state.handleUserID = userID
			state.showEditUser = true
		},
		hideEditUserDialog: state => {
			state.showEditUser = false
			state.handleUserID = null
		},
		showDeleteUserConfirmDialog: (state, { payload: userID }) => {
			state.handleUserID = userID
			state.showDeleteUserConfirm = true
		},
		hideDeleteUserConfirmDialog: state => {
			state.showDeleteUserConfirm = false
			state.handleUserID = null
		}
	},

	extraReducers: builder => {
		builder.addCase(loginUserAction.fulfilled, (state, action) => {
			state.showLoginDialog = false
			console.log('state.showLoginDialog: ')
			console.log(state.showLoginDialog)
		})
		builder.addCase(logoutUserAction, (state, action) => {
			state.showUserManagement = false
			state.showEditUser = false
			console.log('state.showLoginDialog: ')
			console.log(state.showLoginDialog)
		})
	}
})

export const {
	showLoginModal,
	hideLoginModal,
	showUserManagement,
	hideUserManagement,
	showCreateUserDialog,
	hideCreateUserDialog,
	showEditUserDialog,
	hideEditUserDialog,
	showDeleteUserConfirmDialog,
	hideDeleteUserConfirmDialog
} = UISlice.actions

export const selectShowUsers = state => state.UI.showUserManagement
export const selectCreateUserDialog = state => state.UI.showCreateUser
export const selectEditUserDialog = state => state.UI.showEditUser
export const selectDeleteUserConfirmDialog = state => state.UI.showDeleteUserConfirm
export const selectHandleUserID = state => state.UI.handleUserID

export default UISlice.reducer
