interface base{
    [key: string]: any;
}
export interface IPost extends base{
    postId: number;
}
export interface IComment extends base{
    commentId: number;
}
export interface IAlbum extends base{
    albumId: number;
}
export interface IPhoto extends base{
    photoId: number;
}
export interface ITodo extends base{
    todoId: number;
}
export interface IUser extends base{
    userId: number;
}
