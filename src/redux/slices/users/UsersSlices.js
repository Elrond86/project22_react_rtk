import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

const initialState = {
	user: null, //das wird später der user, wenn ich mich eingelogt habe
	accessToken: null,
	error: null,
}

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
	async (payload, { rejectWithValue, getState, dispatch } /* condition = true */) => {
		/**we ned to tell the server with this litle config, that we're sending json-data.
		 * express expects that anyway, but this is good practice
		 *  */
		const config = {
			headers: {
				'Content-Type': 'application/json',
			},
		}
		try {
			//make http call here ^= https://localhost/authenticate
			// we'll use '{ data }' instead of 'res' / 'response'. to get the actuall data from inside the response
			const { data } = await axios.get(`${process.env.REACT_APP_API_BASEURL}/authenticate`, {
				payload,
				config,
			})
			return data
		} catch (error) {
			if (!error?.response) {
				throw error //wir schmeißen costum error, wenn es keinen server-error-gibt
			}
			return rejectWithValue(error?.response?.data)
		}
	}
)

/** ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
 * evtl. muss doch sowas hier gesendet und returnt werden:
 *   auth: { username: userID, password }
    }
  )
  return res.headers.authorization ... mal sehen


von gesammt: 
export async function login({ userID, password }) {
	const res = await axios.get(`${process.env.REACT_APP_API_BASEURL}/authenticate`, {
		auth: { username: userID, password },
	})
	return res.headers.authorization
}
*/

/** Slices */

const usersSlices = createSlice({
	name: 'users',
	initialState: {},

	/** we use extraReducer , when we call the API
	 * builder helps to make a request or to determine (bestimmen) how our state get changed
	 *  in addCase our action becomes our case
	 */
	extraReducers: builder => {
		//   Login action
		builder.addCase(loginUserAction.pending, (state, action) => {
			state.userLoading = true
			state.userAppError = undefined
			state.userServerErr = undefined
		})

		// handle success state
		builder.addCase(loginUserAction.fulfilled, (state, action) => {
			state.userAuth = action?.payload
			state.userLoading = false
			state.userAppError = undefined
			state.userServerErr = undefined
		})

		//handle rejectet state
		builder.addCase(loginUserAction.rejected, (state, action) => {
			state.userLoading = false
			state.userAppError = action?.payload.message
			state.userServerErr = action?.error?.message
		})
	},
})

/** Errors:
 * 1. System Error
 * 2. Systwem interruption
 */

export default usersSlices.reducer
