import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
    items: [],
    status: null,
    error : null
}

export const productsFetch = createAsyncThunk(
    "products/productsFetch",
    async (id=null, {rejectWithValue}) => {
        try {
            const response = await axios.get("http://localhost:3001/products")
            return response?.data;
        } catch (error) {
            return rejectWithValue("An error occured " + error.response.data);
        }
    }
)

const productsSlice = createSlice({
    name: "products",
    initialState,
    reducers: {

    },
    extraReducers: {
        [productsFetch.pending]: (state, action) => {
            // Immer library
            state.status = "pending"
        },

        [productsFetch.rejected]: (state, action) => {
            // Immer library
            state.status = "rejected"
            state.error = action.payload
        },

        [productsFetch.fulfilled]: (state, action) => {
            // Immer library
            state.status = "success"
            state.items = action.payload
        },

    }
})


export default productsSlice.reducer;