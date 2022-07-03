import { createSlice } from '@reduxjs/toolkit'

const initialState = {
	user: null, //das wird später der user, wenn ich mich eingelogt habe
	loginPending: false, //Ladeanzeige, während etwas passiert, damit Benutzer sieht, dass er gerade läd
	showLoginDialog: false, //das is des, was vorher im Widged war. Kommt jetzt in den Zentralen store
	error: null,
	accessToken: null,
}
// prettier-ignore
let authenticationSlice = createSlice({
	name: 'authentication',
	initialState: initialState,
	reducers: {
		showLogin: function (state, action) {
			state.showLoginDialog = true /** ...state not requiered... Denn es benutzt intern IMMER-Library!! :D */
		},
		hideLogin: function (state, action) {
			state.showLoginDialog = false
		},
/* 		authPending: function (state, action) {
			state.loginPending = true
		},
		authSuccess: function (state, action) {
			state.user = action.user,
			state.accessToken = action.accessToken
		},
		userLogout: function (state, action) {
			state.user = null, 
			state.accessToken = null
		}, */
	},
})

export const { showLogin, hideLogin, authPending, authSuccess, userLogout } =
	authenticationSlice.actions

export default authenticationSlice.reducer
