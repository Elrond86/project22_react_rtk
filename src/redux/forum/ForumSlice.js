import api from '../utils/api'

export const ForumSlice = api.injectEndpoints({
	addTagTypes: ['Forum'],
	endpoints: builder => ({
		getAllThreads: builder.query({
			query: () => '/forumThreads',
			providesTags: ['Forum']
		}),
		createUser: builder.mutation({
			query: newUser => ({ url: '/users', method: 'POST', body: newUser }),
			invalidatesTags: ['Forum']
		}),
		deleteUser: builder.mutation({
			query: deleteUserID => ({
				url: `/users/${deleteUserID}`,
				method: 'DELETE'
			}),
			invalidatesTags: ['Forum']
		}),
		editUser: builder.mutation({
			query: changedUser => ({
				url: `/users/${changedUser.userID}`,
				method: 'PUT',
				body: changedUser
			}),
			invalidatesTags: ['Forum']
		}),
		getUser: builder.query({
			query: queryUser => ({
				path: `/users/${queryUser.userID}`,
				method: postMessage
			}),
			invalidatesTags: ['Forum']
		})
	})
})

export const {
	usegetAllThreadsQuery,
	useCreateUserMutation,
	useDeleteUserMutation,
	useEditUserMutation,
	useGetUserQuery
} = ForumSlice
