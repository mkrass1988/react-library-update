import { createSlice } from '@reduxjs/toolkit'

const rootSlice = createSlice({
    name: "root",
    initialState: {
        title: "Title",
        author: "Author",
        length: "Length",
        cover: "Cover",
        isbn: "ISBN"
    },
    reducers: {
        chooseTitle: (state, action) => { state.title = action.payload},
        chooseAuthor: (state, action) => { state.author = action.payload},
        chooseLength: (state, action) => { state.length = action.payload},
        chooseCover: (state, action) => { state.cover = action.payload},
        chooseISBN: (state, action) => { state.isbn = action.payload}
    }
})

export const reducer = rootSlice.reducer;
export const { chooseTitle, chooseAuthor, chooseLength, chooseCover, chooseISBN } = rootSlice.actions