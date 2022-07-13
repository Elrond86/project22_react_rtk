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
		editThread: builder.mutation({
			query: ({ forumThreadID, changedThread }) => ({
				url: `/forumThreads/${forumThreadID}`,
				method: 'PUT',
				body: changedThread
			}),
			invalidatesTags: ['Forum']
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
	useEditThreadMutation,
	useGetThreadQuery
} = ForumSlice
