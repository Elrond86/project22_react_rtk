import api from '../utils/api'
import { logoutUserAction } from '../authentication/AuthenticationSlices'

export const ForumMessagesSlice = api.injectEndpoints({
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
	},

	reducers: {
		errorToState: (state, { error }) => {
			state.error = error
		}
	}
})

export const {
	useGetAllMessagesQuery,
	useGetThreadMessagesQuery,
	// useGetMessageQuery,
	useCreateMessageMutation,
	useEditMessageMutation,
	useDeleteMessageMutation,
	errorToState
} = ForumMessagesSlice

export const selectAllForumMessages = state => state.api.forumThreads
export const selectAll = state => state.api
export const selectError = state => state.api.error
