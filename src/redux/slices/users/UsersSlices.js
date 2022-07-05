import { createAsyncThunk } from '@reduxjs/toolkit'

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
	'user/login',
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

const userSclices = createSlice({
	name: 'users',
	initialState,
	extraReducers: builder => {},
})

/** we use extraReducer , when we call the API */
extraReducers: () => {}

/* authExec: function (state, action){
		state.user = "loggedInUser" 
		authPending: function (state, action) {
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
