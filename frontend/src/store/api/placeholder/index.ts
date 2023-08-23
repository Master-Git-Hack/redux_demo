
import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQuery } from "../baseUrl";
import {
	IPost,IComment,IAlbum,IPhoto,ITodo,IUser
} from "./types";
import { RootState } from "@redux/index";
import {api} from "@fetch/index"
export const placeholderApi = createApi({
	reducerPath: "PlaceholderApi",
	baseQuery,
	endpoints: (builder) => ({
        getPosts: builder.query<IPost[], null>({
            query: () => `posts`,
        }),
        getPostById: builder.query<IPost[], {id:number}>({
            query: (id) => `posts/${id}`,
        }),
        getPostCommends: builder.query<IPost[], {id:number}>({
            query: (id) => `posts/${id}/comments`,
        }),
        getComments: builder.query<IComment[],null>({
            query: () => `comments`,
        }),
        getCommentsPost: builder.query<IComment,{postId:number}>({
            query: (postId) => `comments?postId=${postId}`,
        }),
        getCommentsById: builder.query<IComment,{id:number}>({
            query: (id) => `comments/${id}`,
        }),
        getAlbums: builder.query<IAlbum[],null>({
            query: () => `albums`,
        }),
        getAlbumsById: builder.query<IAlbum,{id:number}>({
            query: (id) => `albums/${id}`,
        }),
        getAlbumsPhotos: builder.query<IAlbum,{id:number}>({
            query: (id) => `albums/${id}/photos`,
        }),
        getPhotos: builder.query<IPhoto[],null>({
            query: () => `photos`,
        }),
        getPhotosById: builder.query<IPhoto[],{id:number}>({
            query: (id) => `photos/${id}`,
        }),
        getTodos: builder.query<ITodo[],null>({
            query: () => `todos`,
        }),
        getTodosById: builder.query<ITodo,{id:number}>({
            query: (id) => `todos/${id}`,
        }),
        getUsers: builder.query<IUser[],null>({
            query: () => `users`,
            transformResponse: (data: any) => {
                
                return data?.map(({ email, ...rest }: IUser) => {
                    const baseEmail = email?.split("@")[0];
                    const email2 = `${baseEmail}@dummy.domain.org`
                    return ({...rest,email:email.toLowerCase(),email2})
                })
            }
        }),
        getUsersById: builder.query<IUser,{id:number}>({
            // queryFn: async (id) => {
            //     try {
            //         const {data} = await api.get({ url: `users/${id}` });
            //         console.log(data)
            //         return data
            //     } catch (error) {
            //         console.error(error);
            //         return { data: error?.response?.data }
            //     }
            //   }
            query: (id) => `users/${id}`
        }),
        getUsersAlbums: builder.query<IUser,{id:number}>({
            query: (id) => `users/${id}/albums`,
        }),
        getUsersTodos: builder.query<IUser,{id:number}>({
            query: (id) => `users/${id}/todos`,
        }),
        getUsersPosts: builder.query<IUser,{id:number}>({
            query: (id) => `users/${id}/posts`,
        }),
        getUserComments: builder.query<IUser,{id:number}>({
            query: (id) => `users/${id}/comments`,
        }),
        getUserPhotos: builder.query<IUser,{id:number}>({
            query: (id) => ({
                url: `users/${id}/photos`,
                method: "GET",
                headers: {
                    'Authorization': 'Bearer your-access-token',
                },
            }),
        }),
        postPost: builder.mutation<IPost, { body: IPost }>({
            query: (body) => ({
                url: `posts`,
                method: "POST",
                body,
                headers: {
                    // Add your custom headers here
                    'Authorization': 'Bearer your-access-token',
                },
                }),
        }),
        putPost: builder.mutation<IPost, { body: IPost }>({
            query: (body) => ({
                url: `posts`,
                method: "PUT",
                body,
            }),
        }),
        patchPost: builder.mutation<IPost, { body: IPost }>({
            query: (body) => ({
                url: `posts`,
                method: "PATCH",
                body,
            }),
        }),
        deletePost: builder.mutation<IPost, { body: IPost }>({
            query: (body) => ({
                url: `posts`,
                method: "DELETE",
                body,
            }),
        }),
        postComment: builder.mutation<IComment, { body: IComment }>({
            query: (body) => ({
                url: `comments`,
                method: "POST",
                body,
            }),
        }),
        putComment: builder.mutation<IComment, { body: IComment }>({
            query: (body) => ({
                url: `comments`,
                method: "PUT",
                body,
            }),
        }),
        patchComment: builder.mutation<IComment, { body: IComment }>({
            query: (body) => ({
                url: `comments`,
                method: "PATCH",
                body,
            }),
        }),
        deleteComment: builder.mutation<IComment, { body: IComment }>({
            query: (body) => ({
                url: `comments`,
                method: "DELETE",
                body,
            }),
        }),
        postAlbum: builder.mutation<IAlbum, { body: IAlbum }>({
            query: (body) => ({
                url: `albums`,
                method: "POST",
                body,
            }),
        }),
        putAlbum: builder.mutation<IAlbum, { body: IAlbum }>({
            query: (body) => ({
                url: `albums`,
                method: "PUT",
                body,
            }),
        }),
        patchAlbum: builder.mutation<IAlbum, { body: IAlbum }>({
            query: (body) => ({
                url: `albums`,
                method: "PATCH",
                body,
            }),
        }),
        deleteAlbum: builder.mutation<IAlbum, { body: IAlbum }>({
            query: (body) => ({
                url: `albums`,
                method: "DELETE",
                body,
            }),
        }),
        postPhoto: builder.mutation<IPhoto, { body: IPhoto }>({
            query: (body) => ({
                url: `photos`,
                method: "POST",
                body,
            }),
        }),
        putPhoto: builder.mutation<IPhoto, { body: IPhoto }>({
            query: (body) => ({
                url: `photos`,
                method: "PUT",
                body,
            }),
        }),
        patchPhoto: builder.mutation<IPhoto, { body: IPhoto }>({
            query: (body) => ({
                url: `photos`,
                method: "PATCH",
                body,
            }),
        }),
        deletePhoto: builder.mutation<IPhoto, { body: IPhoto }>({
            query: (body) => ({
                url: `photos`,
                method: "DELETE",
                body,
            }),
        }),
        postTodo: builder.mutation<ITodo, { body: ITodo }>({
            query: (body) => ({
                url: `todos`,
                method: "POST",
                body,
            }),
        }),
        putTodo: builder.mutation<ITodo, { body: ITodo }>({
            query: (body) => ({
                url: `todos`,
                method: "PUT",
                body,
            }),
        }),
        patchTodo: builder.mutation<ITodo, { body: ITodo }>({
            query: (body) => ({
                url: `todos`,
                method: "PATCH",
                body,
            }),
        }),
        deleteTodo: builder.mutation<ITodo, { body: ITodo }>({
            query: (body) => ({
                url: `todos`,
                method: "DELETE",
                body,
            }),
        }),
        postUser: builder.mutation<IUser, { body: IUser }>({
            query: (body) => ({
                url: `users`,
                method: "POST",
                body,
            }),
        }),
        putUser: builder.mutation<IUser, { body: IUser }>({
            query: (body) => ({
                url: `users`,
                method: "PUT",
                body,
            }),
        }),
        patchUser: builder.mutation<IUser, { body: IUser }>({
            query: (body) => ({
                url: `users`,
                method: "PATCH",
                body,
            }),
        }),
        deleteUser: builder.mutation<IUser, { body: IUser }>({
            query: (body) => ({
                url: `users`,
                method: "DELETE",
                body,
            }),
        }),
	}),
});
export const {
    useGetPostsQuery,
    useGetPostByIdQuery,
    useGetPostCommendsQuery,
    useGetCommentsQuery,
    useGetCommentsPostQuery,
    useGetCommentsByIdQuery,
    useGetAlbumsQuery,
    useGetAlbumsByIdQuery,
    useGetAlbumsPhotosQuery,
    useGetPhotosQuery,
    useGetPhotosByIdQuery,
    useGetTodosQuery,
    useGetTodosByIdQuery,
    useGetUsersQuery,
    useGetUsersByIdQuery,
    useGetUsersAlbumsQuery,
    useGetUsersTodosQuery,
    useGetUsersPostsQuery,
    useGetUserCommentsQuery,
    useGetUserPhotosQuery,
    usePostPostMutation,
    usePutPostMutation,
    usePatchPostMutation,
    useDeletePostMutation,
    usePostCommentMutation,
    usePutCommentMutation,
    usePatchCommentMutation,
    useDeleteCommentMutation,
    usePostAlbumMutation,
    usePutAlbumMutation,
    usePatchAlbumMutation,
    useDeleteAlbumMutation,
    usePostPhotoMutation,
    usePutPhotoMutation,
    usePatchPhotoMutation,
    useDeletePhotoMutation,
    usePostTodoMutation,
    usePutTodoMutation,
    usePatchTodoMutation,
    useDeleteTodoMutation,
    usePostUserMutation,
    usePutUserMutation,
    usePatchUserMutation,
    useDeleteUserMutation,

} = placeholderApi;
export const getPlaceholcerAPI = (state: RootState) => state.PlaceholderApi;