import api from '../utils/api'

export const ForumSlice = api.injectEndpoints({
	addTagTypes: ['Forum'],
	endpoints: builder => ({
		getAllThreads: builder.query({
			query: () => '/forumThreads',
			providesTags: ['Forum']
		}),
		createUser: builder.mutation({
			query: newThread => ({ url: '/forumThreads', method: 'POST', body: newThread }),
			invalidatesTags: ['Forum']
		}),
		deleteUser: builder.mutation({
			query: deleteUserID => ({
				url: `/forumThreads/${deleteUserID}`,
				method: 'DELETE'
			}),
			invalidatesTags: ['Forum']
		}),
		editUser: builder.mutation({
			query: changedThread => ({
				url: `/forumThreads/${changedThread._id}`,
				method: 'PUT',
				body: changedThread
			}),
			invalidatesTags: ['Forum']
		}),
		getUser: builder.query({
			query: queryThread => ({
				path: `/forumThreads/${queryThread._id}`,
				method: postMessage
			}),
			invalidatesTags: ['Forum']
		})
	})
})

export const {
	useGetAllThreadsQuery,
	useCreateThreadMutation,
	useDeleteUserMutation,
	useEditUserMutation,
	useGetUserQuery
} = ForumSlice
