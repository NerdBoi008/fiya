import { User } from "@/types/index.types"
import { createSlice } from "@reduxjs/toolkit"
import { getSignedInUser } from "../appwrite/server/user.actions"

const initialState: User = null                                         

export const cartSlice = createSlice({
    initialState,
    name: 'User Slice',
    reducers: { 
        getSiggedInUser: async () => {
            const user = await getSignedInUser()
        }
    }
})