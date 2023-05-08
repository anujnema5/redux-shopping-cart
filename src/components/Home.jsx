import React from 'react'
import { useNavigate } from 'react-router-dom';
import { useGetAllProductsQuery } from '../features/productsAPI'
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { useDispatch } from 'react-redux';
import { addToCart } from '../features/cartSlice';

const Home = () => {
    const { data, error, isLoading } = useGetAllProductsQuery();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleAddToCart = (product) =>{
        dispatch(addToCart(product));
        // navigate('/cart');
        window.location.href = "/cart"
    }


    return (
        <div className=' relative flex flex-col lg:justify-start items-center lg:items-start h-full'>
            <h1 className='text-slate-600 inline-block uppercase lg:text-3xl text-2xl font-semibold'>Home</h1>
            {isLoading ?
                <div className='absolute top-1/2'>
                    <CircularProgress className='' size={90} style={{ transform: "translate(-50%, -50%)" }} />
                </div> :

                error ?
                    <h1 className='text-slate-600 inline-block lg:text-4xl sm:text-3xl text-lg top-1/3 lg:top-0 font-semibold lg:relative absolute my-auto mx-auto'>Oops ! Looks like something went wrong </h1> :

                    data ?
                        <div className='product mt-24 h-auto w-full'>
                            <h2 className='text-slate-600 inline-block uppercase lg:text-3xl text-xl font-semibold mb-5'>New Arrivals</h2>
                            <div className='flex h-auto flex-wrap gap-7 items-center justify-center'>
                                {data && data.map(product => (
                                    <div key={product.id} className='w-80 h-80  border-2 border-slate-200 rounded-xl flex flex-col items-center justify-center'>
                                        <h3>{product.title}</h3>
                                        <img src={product.thumbnail} alt={product.brand} className='w-4/5' />
                                        {/* <p>{product.description}</p> */}
                                        <h3>Product price : ${product.price}</h3>
                                        <Button variant="contained" onClick={()=>handleAddToCart(product)} className='bg-orange-800'>Add to Cart</Button>

                                    </div>
                                ))}
                            </div>
                        </div> : ""
            }
        </div>
    )
}

export default Home