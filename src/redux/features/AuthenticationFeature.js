import { createSlice } from '@reduxjs/toolkit'

const initialState = {
	user: null, //das wird später der user, wenn ich mich eingelogt habe
	loginPending: false, //Ladeanzeige, während etwas passiert, damit Benutzer sieht, dass er gerade läd
	showLoginDialog: false, //das is des, was vorher im Widged war. Kommt jetzt in den Zentralen store
	error: null,
}

let authenticationSlice = createSlice({
	name: 'authentication',
	initialState: initialState,
	reducer: {},
})
