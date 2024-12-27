import { CartItem } from "@/types/index.types";
import { createSlice } from "@reduxjs/toolkit";

const initialState: CartItem[] = []

export const cartSlice = createSlice({
    initialState,
    name: 'Cart Slice',
    reducers: {
        addCartItem: (state) => {
            
        }
    }
})