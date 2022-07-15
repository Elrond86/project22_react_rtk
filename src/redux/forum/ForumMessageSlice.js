import api from '../utils/api'

export const forumMessagesSlice = api.injectEndpoints({
	addTagTypes: ['ForumMessages'],
	endpoints: builder => ({
		getAllMessages: builder.query({
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
		createMessage: builder.mutation({
			query: newForumMessage => ({
				url: '/forumMessages',
				method: 'POST',
				body: newForumMessage
			}),
			invalidatesTags: ['ForumMessages']
		}),
		editMessage: builder.mutation({
			query: ({ forumMessageID, editedForumMessage }) => ({
				url: `/forumMessages/${forumMessageID}`,
				method: 'PUT',
				body: editedForumMessage
			}),
			invalidatesTags: ['ForumMessages']
		}),
		deleteMessage: builder.mutation({
			query: forumMessageID => ({
				url: `/forumMessages/${forumMessageID}`,
				method: 'DELETE'
			}),
			invalidatesTags: ['ForumMessages']
		})
	})
})

export const {
	useGetAllMessagesQuery,
	useGetThreadMessagesQuery,
	// useGetMessageQuery,
	useCreateMessageMutation,
	useEditMessageMutation,
	useDeleteMessageMutation
} = forumMessagesSlice

export const selectAllForumMessages = state => state.forumThreads
export const selectAll = state => state
