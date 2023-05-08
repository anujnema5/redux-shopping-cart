import React from 'react'
import { Link } from 'react-router-dom'
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import { useSelector } from 'react-redux';

const Navbar = () => {
    const {cartTotalQuantity} = useSelector(state=>state.cart);

    return (
        <div className='navbar w-full rounded-3xl flex items-center gap-3 px-6 py-4 bg-[#e6e6fa] justify-between'>
            <Link to={'/'}>
                <h2 className='text-slate-600 font-bold lg:text-3xl text-xl'>Online Shopping</h2>
            </Link>
            <Link to={'/cart'} className='flex gap-3 items-center justify-between '>

                <ShoppingBagIcon className='' />
                <span className='w-6 h-6 p-5 font-semibold flex items-center justify-center bg-[#c9c9ff] border-2 border-slate-200' style={{borderRadius : "50%"}}>{cartTotalQuantity}</span>
            </Link>
        </div>
    )
}

export default Navbar