/* eslint-disable */

import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
import jwt_decode from 'jwt-decode'

const initialState = {
	user: null,
	accessToken: null,
	error: null,
	isLoggedIn: false,
	isAdministrator: false
}

// Login action

/** Login action */

/** https://javascript.plainenglish.io/createasyncthunk-in-redux-toolkit-4d8d2f0412d3
 *
 * createAsyncThunk - parameters:
 * 1. typePrefix aka Action-Type:
 *      The general naming convention followed is {reducerName}/{actionType}
 *
 * 2. payloadCreator: is the callback function (async (_, { rejectWithValue })=>{}),
 *      the first param (here 'payload') is the argument which is passed to the callback.
 *      The second param is the thunkApi.
 *
 * 3. options: is an object with two props,
 *      condition is a callback which returns a bool that can be used to skip execution,
 *      dispatchConditionRejection uses the condition to dispatch the action.
 *    If condition is false dispatchConditionRejection will not dispatch any action.
 */

/** payload is alles, was in der API-Message bzw. dem  body ist
 * rejectWithValue to reject userfriendyl Errors
 * getState to get a snapshop of my state inside the payloadCraetor
 */

export const loginUserAction = createAsyncThunk(
	'user/login', // naming convention followed is {reducerName}/{actionType}
	async (payload, { rejectWithValue, getState, dispatch }) => {
		const { userID, password } = payload

		try {
			//make http call here ^= https://localhost/authenticate
			const res = await axios.get(`${process.env.REACT_APP_API_BASEURL}/authenticate`, {
				auth: { username: userID, password }
			})

			console.log('data: ')
			console.log(res.data)
			console.log('Authoroization - Header: ')
			console.log(res.headers.authorization)

			let token = res.headers.authorization
			let decoded = jwt_decode(token)
			return { token, decoded }
		} catch (error) {
			if (!error?.response) {
				throw error //costum error, if other then server-error
			}
			return rejectWithValue(error?.response?.data)
		}
	}
)

const AuthenticationSlices = createSlice({
	name: 'auth',
	initialState,

	reducers: {
		logoutUserAction: state => {
			state.user = null
			state.isLoggedIn = false
			state.userLoading = false
			state.userAppError = null
			state.userServerErr = null
			state.accessToken = null
		}
	},

	/** we use extraReducer , when we call the API
	 * builder helps to make a request or to determine (bestimmen) how our state get changed
	 *  in addCase our action becomes our case
	 */

	extraReducers: builder => {
		// Login action
		builder.addCase(loginUserAction.pending, state => {
			state.userLoading = 'pending'
			state.userAppError = null
			state.userServerErr = null
		})

		// handle success state
		builder.addCase(loginUserAction.fulfilled, (state, action) => {
			state.user = action?.payload?.decoded
			state.accessToken = action?.payload?.token
			state.isLoggedIn = true
			state.userLoading = 'done'
			state.userAppError = null
			state.userServerErr = null
		})

		// handle rejectet state
		builder.addCase(loginUserAction.rejected, (state, action) => {
			state.userLoading = false
			state.isLoggedIn = false
			state.userAppError = action?.payload.message
			state.userServerErr = action?.error?.message
		})
	}
})

export const { logoutUserAction } = AuthenticationSlices.actions

export const selectUserID = state => state?.auth?.user?.userID
export const selectUserName = state => state?.auth?.user?.userName
export const selectAdminstatus = state => state?.auth?.user?.isAdministrator
export const selectAccessToken = state => state?.auth?.accessToken
export const selectAuthStatus = state => state?.auth?.isLoggedIn

export default AuthenticationSlices.reducer
