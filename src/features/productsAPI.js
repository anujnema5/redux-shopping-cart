import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';

const BASE_URL = "http://localhost:3001"

// THIS WILL FETCH THE DATA AVAILABLE IN THE SERVER
export const productsApi = createApi({
    reducerPath : "productsApi",
    baseQuery : fetchBaseQuery({baseUrl :BASE_URL }),
    endpoints : (builder)=>({
        getAllProducts : builder.query({
            // THIS WILL ADD http://localhost:3001/products TO OUR BASE_URL
            query : ()=> "products", 
        })
    })
})

// THIS EXPORT WILL HELP US IN FETCHING THE DATA :)
export const {useGetAllProductsQuery} = productsApi