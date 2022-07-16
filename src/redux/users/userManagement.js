import api from '../utils/api'

export const userManagementSlice = api.injectEndpoints({
	addTagTypes: ['User'],
	endpoints: builder => ({
		getAllUsers: builder.query({
			query: () => '/users',
			providesTags: ['User']
		}),
		createUser: builder.mutation({
			query: newUser => ({ url: '/users', method: 'POST', body: newUser }),
			invalidatesTags: ['User']
		}),
		deleteUser: builder.mutation({
			query: deleteUserID => ({
				url: `/users/${deleteUserID}`,
				method: 'DELETE'
			}),
			invalidatesTags: ['User']
		}),
		editUser: builder.mutation({
			query: changedUser => ({
				url: `/users/${changedUser.userID}`,
				method: 'PUT',
				body: changedUser
			}),
			invalidatesTags: ['User']
		}),
		getUser: builder.query({
			query: queryUser => ({
				path: `/users/${queryUser.userID}`,
				method: postMessage
			}),
			invalidatesTags: ['User']
		})
	})
})

export const {
	useGetAllUsersQuery,
	useCreateUserMutation,
	useDeleteUserMutation,
	useEditUserMutation,
	useGetUserQuery
} = userManagementSlice
