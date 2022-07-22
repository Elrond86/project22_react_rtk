/* eslint-disable */

import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export default createApi({
	reducerPath: 'api',
	baseQuery: fetchBaseQuery({
		baseUrl: process.env.REACT_APP_API_BASEURL,
		prepareHeaders: (headers, { getState }) => {
			const token = getState().auth.accessToken
			if (token) {
				headers.set('Authorization', token)
			}
			console.log('using api...')
			return headers
		}
	}),
	endpoints: () => ({
		addTagTypes: ['ForumMessages'],
		endpoints: builder => ({
			getAllMessages: builder.query({
				query: () => '/forumMessages',
				providesTags: ['ForumMessages']
			)} // alles, was in injectEndpoints steht (bei den slices) würde in diese endpoint-funktion kommen
})

// create api legt den api.slices an bzw. bringt auth-header zusammen mit den endpoints,
// dadurch muss ich das nicht bei allen requests neu definieren
