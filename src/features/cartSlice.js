import { createSlice } from "@reduxjs/toolkit";
import { toast } from 'react-toastify';

const initialState = {
    cartItems: localStorage.getItem("cartItems") ? JSON.parse(localStorage.getItem("cartItems")) : [],
    cartTotalQuantity: 0,
    cartTotalAmount: 0
}

const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: { 
        addToCart(state, action) {
            const itemIndex = state.cartItems.findIndex((item) => item.id === action.payload.id);

            if (itemIndex >= 0) {
                state.cartItems[itemIndex].cartQuantity += 1
                toast.info(`${action.payload.title} Quantity Increased`, {
                    position: "bottom-left"
                })
            } else {
                const tempProduct = { ...action.payload, cartQuantity: 1 }
                state.cartItems.push(tempProduct)
                toast.success(`${action.payload.title} added to the Cart`, {
                    position: "bottom-left"
                })
            }

            localStorage.setItem("cartItems", JSON.stringify(state.cartItems))
        },

        removeFromCart(state, action) {
            const nextCartItem = state.cartItems.filter((product) => {
                return product.id !== action.payload.id
            })
            state.cartItems = nextCartItem;
            localStorage.setItem("cartItems", JSON.stringify(state.cartItems));

            toast.error(`${action.payload.title} removed from cart`, {
                position: "bottom-left"
            })
        },


        decreaseCart(state, action) {
            const itemIndex = state.cartItems.findIndex((item) => {
                return item.id === action.payload.id
            })

            if (state.cartItems[itemIndex].cartQuantity > 1) {
                state.cartItems[itemIndex].cartQuantity -= 1;

                toast.info(`Decreased ${action.payload.title} cart quantity`, {
                    position: "bottom-left"
                })

                localStorage.setItem("cartItems", JSON.stringify(state.cartItems));

            } else if (state.cartItems[itemIndex].cartQuantity === 1) {
                const nextCartItem = state.cartItems.filter((product) => {
                    return product.id !== action.payload.id
                })
                state.cartItems = nextCartItem;

                toast.error(`${action.payload.title} removed from cart`, {
                    position: "bottom-left"
                })
                localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
            }
        },

        clearCart(state, action) {
            state.cartItems.length = 0
            toast.error(`Cleared cart`, {
                position: "bottom-left"
            })
            localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
        },

        getTotals(state) {
            let { total, quantity } = state.cartItems.reduce((cartTotal, cartItem) => {
                const { price, cartQuantity } = cartItem
                const itemTotal = price * cartQuantity

                cartTotal.total += itemTotal
                cartTotal.quantity += cartQuantity

                return cartTotal
            },
                {
                    total: 0,
                    quantity: 0
                }
            );

            state.cartTotalAmount = total
            state.cartTotalQuantity = quantity

        }

        // getTotals(state) {
        //     let { total, quantity } = state.cartItems.reduce((cartTotal, cartItems) => {
        //         const { price, cartQuantity } = cartItems
        //         const itemTotal = price * cartQuantity;

        //         cartTotal.total += itemTotal;
        //         cartTotal.quantity += cartQuantity;

        //         return cartTotal
        //     },
        //         {
        //             total: 0,
        //             quantity: 0
        //         }
        //     );

        //     state.cartTotalQuantity = quantity
        //     state.cartTotalAmount = total
        // }
    }
})

export const { addToCart, removeFromCart, clearCart, decreaseCart, increaseCart, getTotals } = cartSlice.actions;
export default cartSlice.reducer;