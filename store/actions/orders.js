import Order from "../../models/order";
export const ADD_ORDER = 'ADD_ORDER';
export const SET_ORDER = 'SET_ORDER';

export const fetchOrders =() => {
    return async dispatch => {
        try{
            const response = await fetch('https://shop-app-e55f5-default-rtdb.firebaseio.com/orders/u1.json');
            if(!response.ok){
                throw new Error('Something Went Wrong');
            }
        const resData = await response.json();
        const loadedOrders = [];
        for(const key in resData){
            loadedOrders.push(
                new Order(
                key, 
                resData[key].cartItems,
                resData[key].totalAmount,
                new Date(resData[key].date)
            )
         )
        }
        dispatch({type: SET_ORDER, orders:loadedOrders})
        }
        catch(err){
            throw err;        
        }
        
    }
}
export const addOrder = (cartItems, totalAmount) => {
    return async dispatch => {
        const date = new Date();
        const repsonse = await fetch('https://shop-app-e55f5-default-rtdb.firebaseio.com/orders/u1.json', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                cartItems,
                totalAmount,
                date: date.toISOString()
            })
        });
        if(!repsonse.ok){
            throw new Error("Something Went Wrong!");
        }
        const resData = await repsonse.json();
        dispatch({
            type: ADD_ORDER,
            orderData: {
                id: resData.name,
                items: cartItems, 
                amount: totalAmount,
                date: date,
            }
        });
    };
};