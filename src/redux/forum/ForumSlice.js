import api from '../utils/api'

export const ForumSlice = api.injectEndpoints({
	addTagTypes: ['Forum'],
	endpoints: builder => ({
		getAllThreads: builder.query({
			query: () => '/forumThreads',
			providesTags: ['Forum']
		}),

		createThread: builder.mutation({
			query: newThread => ({
				url: '/forumThreads',
				method: 'POST',
				body: newThread
			}),
			invalidatesTags: ['Forum']
		}),

		deleteThread: builder.mutation({
			query: deleteThreadID => ({
				url: `/forumThreads/${deleteThreadID}`,
				method: 'DELETE'
			}),
			invalidatesTags: ['Forum']
		}),

		updateThread: builder.mutation({
			query: ({ _id, ...rest }) => ({
				url: `/forumThreads/${_id}`,
				method: 'PUT',
				body: rest
			}),
			invalidatesTags: ['ForumThreads']
		}),

		getThread: builder.query({
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
	useDeleteThreadMutation,
	useUpdateThreadMutation,
	useGetThreadQuery
} = ForumSlice
