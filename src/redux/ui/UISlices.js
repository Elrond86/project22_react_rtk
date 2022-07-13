import { createSlice } from '@reduxjs/toolkit'
import { loginUserAction, logoutUserAction } from '../authentication/AuthenticationSlices'

const initialState = {
	loginPending: false, //Ladeanzeige, während etwas passiert, damit Benutzer sieht, dass er gerade lädt
	showLoginDialog: false, //das is des, was vorher im Widged war. Kommt jetzt in den Zentralen store
	error: null,
	showUserManagement: false,
	showForumOverview: false,
	showEditUser: false,
	showDeleteUserConfirm: false,
	showCreateUser: false
}

let uiSlice = createSlice({
	name: 'ui',
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
			state.showForumOverview = false
		},
		hideUserManagement: (state, action) => {
			state.showUserManagement = false
			state.showEditUser = false
		},

		showForumOverview: (state, action) => {
			state.showForumOverview = true
			state.showUserManagement = false
		},
		hideForumOverview: (state, action) => {
			state.showForumOverview = false
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
		},

		showCreateThreadDialog: state => {
			state.showCreateThread = true
		},
		hideCreateThreadDialog: state => {
			state.showCreateThread = false
		},
		showEditThreadDialog: (state, { payload: threadID }) => {
			state.handleThreadID = threadID
			state.showEditThread = true
		},
		hideEditThreadDialog: state => {
			state.showEditThread = false
			state.handleThreadID = null
		},
		showDeleteThreadConfirmDialog: (state, { payload: threadID }) => {
			state.handleThreadID = threadID
			state.showDeleteThreadConfirm = true
		},
		hideDeleteThreadConfirmDialog: state => {
			state.showDeleteThreadConfirm = false
			state.handleThreadID = null
		},

		hideAll: (state, action) => {
			state.showUserManagement = false
			state.showEditUser = false
			state.showForumOverview = false
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
	hideAll,

	showLoginModal,
	hideLoginModal,

	showUserManagement,
	hideUserManagement,

	showForumOverview,
	hideForumOverview,

	showCreateUserDialog,
	hideCreateUserDialog,
	showEditUserDialog,
	hideEditUserDialog,
	showDeleteUserConfirmDialog,
	hideDeleteUserConfirmDialog,

	showCreateThreadDialog,
	hideCreateThreadDialog,
	showEditThreadDialog,
	hideEditThreadDialog,
	showDeleteThreadConfirmDialog,
	hideDeleteThreadConfirmDialog
} = uiSlice.actions

export const selectShowUsers = state => state.ui.showUserManagement
export const selectCreateUserDialog = state => state.ui.showCreateUser
export const selectEditUserDialog = state => state.ui.showEditUser
export const selectDeleteUserConfirmDialog = state => state.ui.showDeleteUserConfirm
export const selectHandleUserID = state => state.ui.handleUserID

export const selectshowForumOverview = state => state.ui.showForumOverview
export const selectCreateThreadDialog = state => state.ui.showCreateThread
export const selectEditThreadDialog = state => state.ui.showEditThread
export const selectDeleteThreadConfirmDialog = state => state.ui.showDeleteThreadConfirm
export const selectHandleThreadID = state => state.ui.handleThreadID

export default uiSlice.reducer