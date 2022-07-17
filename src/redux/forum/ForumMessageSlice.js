import api from '../utils/api'
import { logoutUserAction } from '../authentication/AuthenticationSlices'

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

		createMessage: builder.mutation({
			query: newForumMessage => ({
				url: '/forumMessages',
				method: 'POST',
				body: newForumMessage
			}),
			invalidatesTags: ['ForumMessages']
		}),

		editMessage: builder.mutation({
			query: ({ _id, ...rest }) => ({
				url: `/forumMessage/${_id}`,
				method: 'PUT',
				body: rest
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
	}),
	extraReducers: builder => {
		builder.addCase(logoutUserAction, state => {
			state.query = null
		})
	}
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
