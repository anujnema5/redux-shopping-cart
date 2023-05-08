import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import Input from '@mui/material/Input';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import MailIcon from '@mui/icons-material/Mail';
import Switch from '@mui/material/Switch';
import FormControlLabel from '@mui/material/FormControlLabel';
import ButtonGroup from '@mui/material/ButtonGroup';
import { useDispatch } from 'react-redux';
import { addToCart, clearCart, decreaseCart, getTotals, increaseCart, removeFromCart } from '../features/cartSlice';



const Cart = () => {
    const dispatch = useDispatch();
    const cart = useSelector(state=>state.cart)

    useEffect(()=>{
        dispatch(getTotals())
    },[cart,dispatch])

    const handleDelete = (product)=>{
        dispatch(removeFromCart(product));
    }

    const { cartItems, cartTotalQuantity, cartTotalAmount } = useSelector((state) => state.cart);

    return (
        <div className='cart-conatiner relative'>
            <div>
                <h1 className='text-slate-600 uppercase text-3xl font-semibold flex-auto lg:justify-start flex justify-center'>Shopping Cart</h1>

                <Link to={'/'} className='lg:block hidden'>
                    <div className='flex justify-center items-center gap-3 absolute right-0 top-0'>
                        <ArrowBackIcon size='large' />
                        <h2 className='text-slate-600 lg:text-xl text-lg font-semibold lg:block'>Back To Home</h2>
                    </div>
                </Link>
            </div>

            {cartItems.length ?
                <div>
                    <TableContainer  component={Paper} className='mt-11 px-8 py-3 ' style={{ borderRadius: "10px", backgroundColor: "" }}>
                        <Table sx={{ minWidth: 650 }} aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <TableCell>Product</TableCell>
                                    <TableCell align="right">Price</TableCell>
                                    <TableCell align="right">Quantity</TableCell>
                                    <TableCell align="right">Total</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {cartItems.map((product) => (
                                    <TableRow
                                        key={product.id}
                                        sx={{ '&:last-child td, &:last-child th': { border: 0, } }}
                                        className=''
>
                                        <TableCell component="th" scope="row" className=''>
                                            <div className='flex items-center gap-8'>
                                                <img src={product.thumbnail} alt="" className='w-60 h-44' />
                                                <div className='flex flex-col items-start'>
                                                    <h4 className='text-xl'>{product.title}</h4>

                                                    <IconButton aria-label="delete" size="large" className='' onClick={()=>handleDelete(product)}>
                                                        <DeleteIcon className='-ml-3' />
                                                    </IconButton>
                                                </div>
                                            </div>
                                        </TableCell>
                                        <TableCell align="right">${product.price}</TableCell>
                                        <TableCell align="right" className=''>
                                            <div className='flex justify-end items-center gap-3 w-auto'>
                                                <div className='w-8 h-8 border-2 rounded-md flex items-center justify-center'>{product.cartQuantity}</div>

                                                <ButtonGroup>
                                                    <Button
                                                        aria-label="reduce"
                                                        onClick={() => {
                                                            // setCount(Math.max(count - 1, 0));
                                                            dispatch(decreaseCart(product))
                                                        }}
                                                    >
                                                        <RemoveIcon fontSize="small" />
                                                    </Button>
                                                    <Button
                                                        aria-label="increase"
                                                        onClick={() => {
                                                            // setCount(count + 1);
                                                            dispatch(addToCart(product))
                                                        }}
                                                    >
                                                        <AddIcon fontSize="small" />
                                                    </Button>
                                                </ButtonGroup>
                                            </div>
                                        </TableCell>
                                        <TableCell align="right">{product.price * product.cartQuantity}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>

                    <div className='bg-white p-4 mt-10 lg:w-96 w-80 lg:absolute right-6 flex flex-col lg:items-start rounded-xl gap-4 -ml-2'>
                        <div className='flex justify-between w-full'>
                            <span className='text-2xl font-medium'>Subtotal</span>
                            <span className='amount text-2xl font-medium'>${cartTotalAmount}</span>
                        </div>
                        <p className='text-slate-600 font-normal'>Taxes and Shipping calculated at checkout</p>
                        <Button variant="contained" className='w-full'>Checkout</Button>
                        <Link to={'/'}>
                            <div className='flex justify-center items-center gap-3'>
                                <ArrowBackIcon size='large' className='text-slate-600' />
                                <span className='text-slate-600 font-medium'>Continue Shopping</span>
                            </div>
                        </Link>
                    </div>
                    <div className='mt-10 absolute left-4'>
                    <Button variant="outlined" size='large' onClick={()=>dispatch(clearCart())}>Clear Cart</Button>
                    </div>
                </div> : <div>
                    <h1 className='text-slate-600 lg:text-4xl sm:text-3xl text-lg font-semibold mt-72'>Your Cart is currently empty</h1>
                </div>
            }
        </div>
    )
}

export default Cart