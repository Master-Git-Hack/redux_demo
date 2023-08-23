import { IPost, IComment, IAlbum, IPhoto, ITodo, IUser } from "./types";
import { PayloadAction } from "@reduxjs/toolkit";
export const initialState:IUser = ({})
export const reducers = ({
    createState: (state: IUser, { payload }: PayloadAction<IUser>) => {
        console.log(payload)
        state = {...payload}
     },
    changeEmail: (state: IUser, { payload: { email } }: PayloadAction<IUser>) => {
        state.email = email;
        
    },
    changeUsername: (state: IUser, { payload: { username } }: PayloadAction<IUser>) => {
        state = {
            ...state,
            username,
        }
    }
})
export default reducers;