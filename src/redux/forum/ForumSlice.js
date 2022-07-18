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

		updateThread: builder.mutation({
			query: ({ _id, ...rest }) => ({
				url: `/forumThreads/${_id}`,
				method: 'PUT',
				body: rest
			}),
			invalidatesTags: ['Forum']
		}),

		deleteThread: builder.mutation({
			query: deleteThreadID => ({
				url: `/forumThreads/${deleteThreadID}`,
				method: 'DELETE'
			}),
			invalidatesTags: ['Forum']
		})
	})
})

export const { useGetAllThreadsQuery, useCreateThreadMutation, useDeleteThreadMutation, useUpdateThreadMutation } =
	ForumSlice
