import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export const themeSlice = createSlice({
    name: 'theme',
    initialState: {
        isDarkTheme: false
    },
    reducers: {
        setIsDarkTheme: (state) => {
            const isDarkTheme = state.isDarkTheme
           return {...state, isDarkTheme: !isDarkTheme}
        }
    }
})

export const {setIsDarkTheme} = themeSlice.actions
const {reducer} = themeSlice
export const themeReducer = reducer