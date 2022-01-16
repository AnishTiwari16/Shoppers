import React,{useEffect} from 'react';
import {FlatList, Text} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import OrderItem from '../../shop/OrderItem';
import * as ordersActions from '../../store/actions/orders';

const OrdersScreen = (props) => {
    const orders = useSelector(state => state.orders.orders);
    const dispatch = useDispatch();

    useEffect(()=>{
        dispatch(ordersActions.fetchOrders());
    },[dispatch]);
    
    return(
        <FlatList 
            data = {orders}   // from reducer
            keyExtractor={item => item.id}
            renderItem={itemData => (
                <OrderItem 
                    amount = {itemData.item.totalAmount}
                    date = {itemData.item.readableDate}
                    items = {itemData.item.items}
                />
            )}
        />
    );
};
export default OrdersScreen;