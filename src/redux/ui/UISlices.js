/* eslint-disable */
//prettier-ignore

import { createSlice } from '@reduxjs/toolkit'
import { loginUserAction, logoutUserAction } from '../authentication/AuthenticationSlices'

const initialState = {
	loginPending: false,
	showLoginDialog: false,
	error: null,
	showUserManagement: false,
	showForumOverview: false,
	showEditUser: false,
	showDeleteUserConfirm: false,
	showCreateUser: false,
	showMessages: false,
	showWelcome: true,
	showCreateMessage: false
}

let uiSlice = createSlice({
	name: 'ui',
	initialState,

	/** reducer sind zum manipulieren vom State OHNE API-Zugriff */
	reducers: {
		showWelcome: state => {
			state.showWelcome = true
			state.showCreateMessage = false
		},

		hideWelcome: state => {
			state.showWelcome = false
		},

		showLoginModal: state => {
			state.showLoginDialog = true /** ...state not requiered... Denn es benutzt intern IMMER-Library!! :D */
		},
		hideLoginModal: state => {
			state.showLoginDialog = false
		},
		showUserManagement: state => {
			state.showUserManagement = true
			state.showForumOverview = false
			state.showMessages = false
			state.showWelcome = true
			state.showCreateMessage = false
		},
		hideUserManagement: state => {
			state.showUserManagement = false
			state.showEditUser = false
		},

		showForumOverview: state => {
			state.showUserManagement = false
			state.showForumOverview = true
			state.showMessages = false
			state.handleThreadName = null
			state.handleThreadID = null
			state.showCreateMessage = false
			state.daten = null
		},
		hideForumOverview: state => {
			state.showForumOverview = false
		},

		showMessages: (state, action) => {
			state.showForumOverview = false
			state.showMessages = true
			state.handleThreadID = action.payload[0]
			state.handleThreadName = action.payload[1]
			state.daten = action
			state.showWelcome = false
		},

		hideMessages: state => {
			state.showMessages = false
			state.showForumOverview = true
			state.handleThreadID = null
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
		showEditThreadDialog: (state, action) => {
			state.handleThreadID = action.payload[0]
			state.handleThreadName = action.payload[1]
			state.showEditThread = true
		},
		hideEditThreadDialog: state => {
			state.showEditThread = false
			state.handleThreadID = null
			state.handleThreadName = null
		},
		showDeleteThreadConfirmDialog: (state, action) => {
			state.handleThreadID = action.payload[0]
			state.handleThreadName = action.payload[1]
			state.showDeleteThreadConfirm = true
		},
		hideDeleteThreadConfirmDialog: state => {
			state.showDeleteThreadConfirm = false
			state.handleThreadID = null
			state.handleThreadName = null
		},

		showCreateMessageDialog: state => {
			state.showCreateMessage = true
		},
		hideCreateMessageDialog: state => {
			state.showCreateMessage = false
		},
		showEditMessageDialog: (state, { payload: MessageID }) => {
			state.handleMessageID = MessageID
			state.showEditMessage = true
		},
		hideEditMessageDialog: state => {
			state.showEditMessage = false
			state.handleMessageID = null
		},
		showDeleteMessageDialog: (state, { payload: MessageID }) => {
			state.handleMessageID = MessageID
			state.showDeleteMessageConfirm = true
		},
		hideDeleteMessageDialog: state => {
			state.showDeleteMessageConfirm = false
			state.handleMessageID = null
		},

		hideAll: state => {
			state.showUserManagement = false
			state.showEditUser = false
			state.showForumOverview = false
			state.showMessages = false
			state.showWelcome = true
			state.showCreateMessage = false
			state.daten = null
			state.handleThreadID = null
			state.handleThreadName = null
		},

		resetUI: state => {
			state.loginPending = false
			state.showLoginDialog = false
			state.error = null
			state.showUserManagement = false
			state.showForumOverview = false
			state.showEditUser = false
			state.showDeleteUserConfirm = false
			state.showCreateUser = false
			state.showMessages = false
			state.showWelcome = true
			state.daten = null
			state.handleThreadID = null
			state.handleThreadName = null
		}
	},

	extraReducers: builder => {
		builder.addCase(loginUserAction.fulfilled, state => {
			state.showLoginDialog = false
			state.showUserManagement = false
			state.showEditUser = false
			state.showForumOverview = false
		})

		builder.addCase(logoutUserAction, state => {
			state.showUserManagement = false
			state.showEditUser = false
			state.showForumOverview = false
		})
	}
})

export const {
	hideAll,
	resetUI,

	showLoginModal,
	hideLoginModal,

	showUserManagement,
	hideUserManagement,

	showForumOverview,
	hideForumOverview,

	showMessages,
	hideMessages,

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
	hideDeleteThreadConfirmDialog,

	showCreateMessageDialog,
	hideCreateMessageDialog,
	showEditMessageDialog,
	hideEditMessageDialog,
	showDeleteMessageDialog,
	hideDeleteMessageDialog
} = uiSlice.actions

export const selectShowUsers = state => state.ui.showUserManagement

export const selectCreateUserDialog = state => state.ui.showCreateUser
export const selectEditUserDialog = state => state.ui.showEditUser
export const selectDeleteUserConfirmDialog = state => state.ui.showDeleteUserConfirm
export const selectHandleUserID = state => state.ui.handleUserID

export const selectShowForumOverview = state => state.ui.showForumOverview

export const selectCreateThreadDialog = state => state.ui.showCreateThread
export const selectEditThreadDialog = state => state.ui.showEditThread
export const selectDeleteThreadConfirmDialog = state => state.ui.showDeleteThreadConfirm

export const selectHandleThreadID = state => state.ui.handleThreadID
export const selectHandleThreadName = state => state.ui.handleThreadName
export const selectShowMessages = state => state.ui.showMessages

export const selectCreateMessageDialog = state => state.ui.showCreateMessage
export const selectDeleteMessageDialog = state => state.ui.showDeleteMessageConfirm
export const selectEditMessageDialog = state => state.ui.showEditMessage
export const selectHandleMessageID = state => state.ui.handleMessageID

export const selectDaten = state => state.ui.daten

export const selectShowWelcome = state => state.ui.showWelcome

export default uiSlice.reducer
