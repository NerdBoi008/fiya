import { configureStore } from "@reduxjs/toolkit";

export const makeStrore = () => {
    return configureStore({
        reducer: {

        }
    })
};

export type AppStore = ReturnType<typeof makeStrore>
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']