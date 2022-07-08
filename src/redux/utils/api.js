import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export default createApi({
	reducerPath: 'api',
	baseQuery: fetchBaseQuery({
		baseUrl: process.env.REACT_APP_API_BASEURL,
		prepareHeaders: (headers, { getState }) => {
			const token = getState().users.accessToken
			if (token) {
				headers.set('Authorization', token)
			}
			return headers
		}
	}),
	endpoints: () => ({})
})
