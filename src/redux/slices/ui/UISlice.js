import { createSlice } from '@reduxjs/toolkit'
import { ListGroup } from 'react-bootstrap'
//import * as authService from '../services/AuthenticationService'

const initialState = {
	loginPending: false, //Ladeanzeige, während etwas passiert, damit Benutzer sieht, dass er gerade läd
	showLoginDialog: false, //das is des, was vorher im Widged war. Kommt jetzt in den Zentralen store
	error: null,
}

let UISlice = createSlice({
	name: 'UI',
	initialState,

	/** reducer sind zum manipulieren vom State OHNE API-Zugriff */
	reducers: {
		showLoginModal: (state, action) => {
			state.showLoginDialog = true /** ...state not requiered... Denn es benutzt intern IMMER-Library!! :D */
		},
		hideLoginModal: (state, action) => {
			state.showLoginDialog = false
		},
	},
})

export const { showLoginModal, hideLoginModal } = UISlice.actions
// , authExec, authPending, authSuccess, userLogout
export default UISlice.reducer
