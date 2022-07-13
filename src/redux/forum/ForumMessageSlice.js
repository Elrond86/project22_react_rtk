import api from '../utils/api'

export const forumMessagesSlice = api.injectEndpoints({
	addTagTypes: ['ForumMessages'],
	endpoints: builder => ({
		getAllForumMessages: builder.query({
			query: () => '/forumMessages',
			providesTags: ['ForumMessages']
		}),
		getForumThreadMessages: builder.query({
			query: forumThreadID => `/forumThreads/${forumThreadID}/forumMessages`,
			providesTags: ['ForumMessages']
		}),
		// get by ID not supported by server
		// getForumMessage: builder.query({
		//   query: (forumMessageId) => `/forumMessages/${forumMessageId}`,
		//   providesTags: ['ForumMessages']
		// }),
		createForumMessage: builder.mutation({
			query: newForumMessage => ({
				url: '/forumMessages',
				method: 'POST',
				body: newForumMessage
			}),
			invalidatesTags: ['ForumMessages']
		}),
		editForumMessage: builder.mutation({
			query: ({ forumMessageID, editedForumMessage }) => ({
				url: `/forumMessages/${forumMessageID}`,
				method: 'PUT',
				body: editedForumMessage
			}),
			invalidatesTags: ['ForumMessages']
		}),
		deleteForumMessage: builder.mutation({
			query: forumMessageID => ({
				url: `/forumMessages/${forumMessageID}`,
				method: 'DELETE'
			}),
			invalidatesTags: ['ForumMessages']
		})
	})
})

export const {
	useGetAllForumMessagesQuery,
	useGetForumThreadMessagesQuery,
	// useGetForumMessageQuery,
	useCreateForumMessageMutation,
	useEditForumMessageMutation,
	useDeleteForumMessageMutation
} = forumMessagesSlice
